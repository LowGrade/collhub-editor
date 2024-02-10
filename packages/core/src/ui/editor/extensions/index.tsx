import StarterKit from '@tiptap/starter-kit';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapUnderline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { Markdown } from 'tiptap-markdown';
import Highlight from '@tiptap/extension-highlight';
import SlashCommand from './slash-command';
import { InputRule } from '@tiptap/core';
import UploadImagesPlugin from '@/ui/editor/plugins/upload-images';
import UpdatedImage from './updated-image';
import CustomKeymap from './custom-keymap';
import DragAndDrop from './drag-and-drop';

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class:
          'collhub-list-disc collhub-list-outside collhub-leading-3 collhub--mt-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          'collhub-list-decimal collhub-list-outside collhub-leading-3 collhub--mt-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'collhub-leading-normal collhub--mb-2',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'collhub-border-l-4 collhub-border-stone-700',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          'collhub-rounded-sm collhub-bg-stone-100 collhub-p-5 collhub-font-mono collhub-font-medium collhub-text-stone-800',
      },
    },
    code: {
      HTMLAttributes: {
        class:
          'collhub-rounded-md collhub-bg-stone-200 collhub-px-1.5 collhub-py-1 collhub-font-mono collhub-font-medium collhub-text-stone-900',
        spellcheck: 'false',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class:
        'collhub-mt-4 collhub-mb-6 collhub-border-t collhub-border-stone-300',
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        'collhub-text-stone-400 collhub-underline collhub-underline-offset-[3px] hover:collhub-text-stone-600 collhub-transition-colors collhub-cursor-pointer',
    },
  }),
  TiptapImage.extend({
    addProseMirrorPlugins() {
      return [UploadImagesPlugin()];
    },
  }).configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'collhub-rounded-lg collhub-border collhub-border-stone-200',
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: 'collhub-rounded-lg collhub-border collhub-border-stone-200',
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or '++' for AI autocomplete...";
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'collhub-not-prose collhub-pl-2',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'collhub-flex collhub-items-start collhub-my-4',
    },
    nested: true,
  }),
  Markdown.configure({
    html: true,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  CustomKeymap,
  DragAndDrop,
];
