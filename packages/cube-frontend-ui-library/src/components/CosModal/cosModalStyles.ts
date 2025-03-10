import { cva } from 'class-variance-authority'

export const backdrop = cva(
  [
    'fixed left-0 top-0 h-dvh w-dvw bg-[rgba(0,26,104,0.1)]',
    'transition-opacity duration-200',
  ],
  {
    variants: {
      isOpen: {
        true: 'pointer-events-auto opacity-100',
        false: 'pointer-events-none opacity-0',
      },
    },
  },
)

// For now the modal content stays mounted even when the modal is closed.
// This is because we use CSS properties (opacity and pointer-events` for a simple,
// smooth transition without dealing with JS animations.
// Consider switching to a JS-based solution if performance becomes an issue.
export const modal = cva(
  [
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'flex max-h-[600px] min-h-[204px] flex-col',
    'rounded-[5px] border border-functional-border-divider bg-grey-0',
    'transition-opacity duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'w-2/5',
        md: 'w-[70%]',
      },
      isOpen: {
        true: 'pointer-events-auto opacity-100',
        false: 'pointer-events-none opacity-0',
      },
    },
  },
)
