import { cva } from 'class-variance-authority'

export const confirmTableStyles = {
  table: cva(['w-full border-separate border-spacing-0']),
  thead: cva([
    'overflow-hidden rounded-[5px] border border-functional-border-divider',
  ]),
  th: cva([
    'secondary-body3 px-4 py-2 text-left text-functional-text-light',
    'border-y border-functional-border-divider bg-scene-background',
    'first-of-type:border-l last-of-type:border-r',
    'first-of-type:rounded-tl-[5px] last-of-type:rounded-tr-[5px]',
  ]),
  td: cva(
    [
      'primary-body4 px-4 py-2.5 text-functional-text',
      'border-b border-b-functional-border-divider bg-grey-0',
      'first-of-type:border-l last-of-type:border-r',
    ],
    {
      variants: {
        isLast: {
          true: 'first-of-type:rounded-bl-[5px] last-of-type:rounded-br-[5px]',
        },
      },
    },
  ),
  bodyTd: cva([
    'px-12 py-4',
    'border-b border-functional-border-divider bg-scene-background',
    'first-of-type:border-l last-of-type:border-r',
    'first-of-type:rounded-bl-[5px] last-of-type:rounded-br-[5px]',
  ]),
}

export const tableHintStyles = {
  text: 'secondary-body3 text-functional-text-light',
  number: cva(['secondary-body3'], {
    variants: {
      error: {
        true: 'text-status-negative',
        false: 'text-functional-title',
      },
    },
  }),
}
