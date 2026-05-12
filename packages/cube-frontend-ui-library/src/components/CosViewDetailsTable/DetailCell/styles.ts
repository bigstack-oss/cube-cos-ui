import { cva } from 'class-variance-authority'

export const containerClasses = cva(
  [
    'flex flex-col gap-y-4 overflow-hidden',
    'transition-[max-height,padding-top,padding-bottom]',
  ],
  {
    variants: {
      isExpanded: {
        true: 'py-1.5 pr-8',
        false: 'max-h-0 p-0',
      },
    },
  },
)
