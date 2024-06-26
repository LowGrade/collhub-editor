import { Editor } from '@tiptap/core';
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
} from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { Dispatch, FC, SetStateAction } from 'react';
import { BubbleMenuItem } from '.';

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'Text',
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive('paragraph') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('orderedList'),
    },
    {
      name: 'Heading 1',
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      name: 'To-do List',
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskItem'),
    },
    {
      name: 'Bullet List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      name: 'Quote',
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      name: 'Code',
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: 'Multiple',
  };

  return (
    <Popover.Root open={isOpen}>
      <div className='collhub-relative collhub-h-full'>
        <Popover.Trigger
          className='collhub-flex collhub-h-full collhub-items-center collhub-gap-1 collhub-whitespace-nowrap collhub-p-2 collhub-text-sm collhub-font-medium collhub-text-stone-600 hover:collhub-bg-stone-100 active:collhub-bg-stone-200'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem?.name}</span>
          <ChevronDown className='h-4 w-4' />
        </Popover.Trigger>

        <Popover.Content
          align='start'
          className='collhub-z-[99999] collhub-my-1 collhub-flex collhub-max-h-80 collhub-w-48 collhub-flex-col collhub-overflow-hidden collhub-overflow-y-auto collhub-rounded collhub-border collhub-border-stone-200 collhub-bg-white collhub-p-1 collhub-shadow-xl collhub-animate-in collhub-fade-in collhub-slide-in-from-top-1'
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className='collhub-flex collhub-items-center collhub-justify-between collhub-rounded-sm collhub-px-2 collhub-py-1 collhub-text-sm collhub-text-stone-600 hover:collhub-bg-stone-100'
              type='button'
            >
              <div className='flex items-center space-x-2'>
                <div className='collhub-flex collhub-items-center collhub-space-x-2'>
                  {' '}
                  <item.icon className='collhub-h-3 collhub-w-3' />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && (
                <Check className='collhub-h-4 collhub-w-4' />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
