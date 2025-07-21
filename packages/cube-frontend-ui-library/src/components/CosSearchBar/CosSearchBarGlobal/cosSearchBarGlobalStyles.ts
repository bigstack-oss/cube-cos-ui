import { cva } from 'class-variance-authority'

export const container = [
  'flex w-full items-center rounded-full',
  'border border-functional-border-divider hover:border-functional-hover-primary focus:border-functional-hover-primary',
]

export const keyword = {
  input: cva(
    [
      'primary-body2 h-[34px] w-full truncate bg-white py-[7px] pl-5 outline-none',
      'text-functional-text placeholder:text-functional-border-darker',
    ],
    {
      variants: {
        variant: {
          regular: 'rounded-full',
          sorting: 'rounded-l-full',
        },
        hasInputValue: {
          true: 'pr-[64px]',
          false: 'pr-[42px]',
        },
      },
    },
  ),
  menu: [
    'z-10 min-w-[160px] overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  item: cva(
    'primary-body3 cursor-pointer px-4 py-[10px] text-functional-text hover:bg-functional-hover-secondary',
    {
      variants: {
        isRecent: {
          true: 'flex items-center',
          false: '',
        },
      },
    },
  ),
}

export const sorting = {
  trigger: [
    'flex h-[34px] cursor-pointer items-center justify-between gap-x-[6px] rounded-r-full',
    'primary-body2 shrink-0 px-5 py-[7px] text-functional-text',
  ],
  triggerIcon: cva(
    'icon-md shrink-0 text-functional-text transition-transform',
    {
      variants: { isOpen: { true: 'rotate-180', false: 'rotate-0' } },
    },
  ),
  menu: [
    'z-10 min-w-[160px] overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  item: 'primary-body3 cursor-pointer px-6 py-[10px] text-functional-text hover:bg-functional-hover-secondary',
}
