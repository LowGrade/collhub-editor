import { cn, getUrlFromString } from '@/lib/utils';
import { Editor } from '@tiptap/core';
import { Check, Trash } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className='collhub-relative'>
      <button
        type='button'
        className='collhub-flex collhub-h-full collhub-items-center collhub-space-x-2 collhub-px-3 collhub-py-1.5 collhub-text-sm collhub-font-medium collhub-text-stone-600 hover:collhub-bg-stone-100 active:collhub-bg-stone-200'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className='collhub-text-base'>↗</p>
        <p
          className={cn(
            'collhub-underline collhub-decoration-stone-400 collhub-underline-offset-4',
            {
              'collhub-text-blue-500': editor.isActive('link'),
            }
          )}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className='collhub-fixed collhub-top-full collhub-z-[99999] collhub-mt-1 collhub-flex collhub-w-60 collhub-overflow-hidden collhub-rounded collhub-border collhub-border-stone-200 collhub-bg-white collhub-p-1 collhub-shadow-xl collhub-animate-in collhub-fade-in collhub-slide-in-from-top-1'
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Paste a link'
            className='collhub-flex-1 collhub-bg-white collhub-p-1 collhub-text-sm collhub-outline-none'
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <button
              type='button'
              className='collhub-flex collhub-items-center collhub-rounded-sm collhub-p-1 collhub-text-red-600 collhub-transition-all hover:collhub-bg-red-100 dark:hover:collhub-bg-red-800'
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className='collhub-h-4 collhub-w-4' />
            </button>
          ) : (
            <button className='collhub-flex collhub-items-center collhub-rounded-sm collhub-p-1 collhub-text-stone-600 collhub-transition-all hover:collhub-bg-stone-100'>
              <Check className='collhub-h-4 collhub-w-4' />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
