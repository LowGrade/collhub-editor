import { Editor } from '@tiptap/core';
import { Check, ChevronDown } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--collhub-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--collhub-highlight-default)',
  },
  {
    name: 'Purple',
    color: 'var(--collhub-highlight-purple)',
  },
  {
    name: 'Red',
    color: 'var(--collhub-highlight-red)',
  },
  {
    name: 'Yellow',
    color: 'var(--collhub-highlight-yellow)',
  },
  {
    name: 'Blue',
    color: 'var(--collhub-highlight-blue)',
  },
  {
    name: 'Green',
    color: 'var(--collhub-highlight-green)',
  },
  {
    name: 'Orange',
    color: 'var(--collhub-highlight-orange)',
  },
  {
    name: 'Pink',
    color: 'var(--collhub-highlight-pink)',
  },
  {
    name: 'Gray',
    color: 'var(--collhub-highlight-gray)',
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className='collhub-relative collhub-h-full'>
        <Popover.Trigger
          className='collhub-flex collhub-h-full collhub-items-center collhub-gap-1 collhub-p-2 collhub-text-sm collhub-font-medium collhub-text-stone-600 hover:collhub-bg-stone-100 active:collhub-bg-stone-200'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className='collhub-rounded-sm collhub-px-1'
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className='collhub-h-4 collhub-w-4' />
        </Popover.Trigger>

        <Popover.Content
          align='start'
          className='collhub-z-[99999] collhub-my-1 collhub-flex collhub-max-h-80 collhub-w-48 collhub-flex-col collhub-overflow-hidden collhub-overflow-y-auto collhub-rounded collhub-border collhub-border-stone-200 collhub-bg-white collhub-p-1 collhub-shadow-xl collhub-animate-in collhub-fade-in collhub-slide-in-from-top-1'
        >
          <div className='collhub-my-1 collhub-px-2 collhub-text-sm collhub-text-stone-500'>
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run();
                setIsOpen(false);
              }}
              className='collhub-flex collhub-items-center collhub-justify-between collhub-rounded-sm collhub-px-2 collhub-py-1 collhub-text-sm collhub-text-stone-600 hover:collhub-bg-stone-100'
              type='button'
            >
              <div className='collhub-flex collhub-items-center collhub-space-x-2'>
                <div
                  className='collhub-rounded-sm collhub-border collhub-border-stone-200 collhub-px-1 collhub-py-px collhub-font-medium'
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && (
                <Check className='collhub-h-4 collhub-w-4' />
              )}
            </button>
          ))}

          <div className='collhub-mb-1 collhub-mt-2 collhub-px-2 collhub-text-sm collhub-text-stone-500'>
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== 'Default' && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className='collhub-flex collhub-items-center collhub-justify-between collhub-rounded-sm collhub-px-2 collhub-py-1 collhub-text-sm collhub-text-stone-600 hover:collhub-bg-stone-100'
              type='button'
            >
              <div className='collhub-flex collhub-items-center collhub-space-x-2'>
                <div
                  className='collhub-rounded-sm collhub-border collhub-border-stone-200 collhub-px-1 collhub-py-px collhub-font-medium'
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Check className='collhub-h-4 collhub-w-4' />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
