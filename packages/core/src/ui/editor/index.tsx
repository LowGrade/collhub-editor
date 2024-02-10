'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultEditorProps } from './props';
import { defaultExtensions } from './extensions';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import { useDebouncedCallback } from 'use-debounce';
import { useCompletion } from 'ai/react';
import { toast } from 'sonner';
import va from '@vercel/analytics';
import { EditorBubbleMenu } from './bubble-menu';
import { getPrevText } from '@/lib/editor';
import { ImageResizer } from './extensions/image-resizer';
import { CollhubContext } from './provider';
import { EditorProps } from './editor.types';

export default function Editor({
  completionApi = '/api/generate',
  className = 'collhub-relative collhub-min-h-[500px] collhub-w-full collhub-max-w-screen-lg collhub-border-stone-200 collhub-bg-white sm:collhub-mb-[calc(20vh)] sm:collhub-rounded-lg sm:collhub-border sm:collhub-shadow-lg',
  defaultValue = '',
  extensions = [],
  editorProps = {},
  onUpdate = () => {},
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  storageKey = 'collhub__content',
  disableLocalStorage = false,
  editable = true,
}: EditorProps) {
  const [content, setContent] = useLocalStorage(storageKey, defaultValue);

  const [hydrated, setHydrated] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    onDebouncedUpdate(editor);

    if (!disableLocalStorage) {
      setContent(json);
    }
  }, debounceDuration);

  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      ...defaultEditorProps,
      ...editorProps,
    },
    editable,
    onUpdate: (e) => {
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === '++' && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          })
        );
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track('Autocomplete Shortcut Used');
      } else {
        onUpdate(e.editor);
        debouncedUpdates(e);
      }
    },
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: 'collhub',
    api: completionApi,
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
      if (err.message === 'You have reached your request limit for the day.') {
        va.track('Rate Limit Reached');
      }
    },
  });

  const prev = useRef('');

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.metaKey && e.key === 'z')) {
        stop();
        if (e.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent('++');
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm('AI writing paused. Continue?')) {
        complete(editor?.getText() || '');
      }
    };
    if (isLoading) {
      document.addEventListener('keydown', onKeyDown);
      window.addEventListener('mousedown', mousedownHandler);
    } else {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Default: Hydrate the editor with the content from localStorage.
  // If disableLocalStorage is true, hydrate the editor with the defaultValue.
  useEffect(() => {
    if (!editor || hydrated) return;

    const value = disableLocalStorage ? defaultValue : content;

    if (value) {
      editor.commands.setContent(value);
      setHydrated(true);
    }
  }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

  useEffect(() => {
    if (
      editor &&
      defaultValue &&
      ((typeof defaultValue === 'string' &&
        editor?.getHTML() !== defaultValue) ||
        (typeof defaultValue === 'object' &&
          editor?.getJSON() !== defaultValue))
    ) {
      editor?.commands.setContent(defaultValue);
    }
  }, [defaultValue, editor]);

  return (
    <CollhubContext.Provider
      value={{
        completionApi,
      }}
    >
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={className}
      >
        {editor && <EditorBubbleMenu editor={editor} />}
        {editor?.isActive('image') && <ImageResizer editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </CollhubContext.Provider>
  );
}
