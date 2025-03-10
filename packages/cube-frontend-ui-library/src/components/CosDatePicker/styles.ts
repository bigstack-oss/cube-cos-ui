import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { DateButtonStatus } from './utils'

export const trigger = cva(
  [
    'secondary-body2 flex h-[34px] items-center gap-2 rounded-[5px] px-4 py-2 font-semibold',
    'border',
  ],
  {
    variants: {
      isSelected: {
        true: '',
        false: '',
      },
      isOpen: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        isSelected: false,
        disabled: false,
        class:
          'border-blue-700 bg-grey-0 text-blue-700 hover:border-blue-600 hover:text-blue-600',
      },
      {
        isSelected: false,
        disabled: true,
        class: 'border-blue-200 text-functional-disable-text',
      },
      {
        isSelected: true,
        disabled: false,
        class:
          'border-blue-700 bg-secondary-50 text-blue-850 hover:bg-secondary-100',
      },
      {
        isSelected: true,
        isOpen: true,
        disabled: false,
        class:
          'border-blue-700 bg-secondary-100 text-blue-850 hover:bg-secondary-100',
      },
      {
        isSelected: true,
        disabled: true,
        class: 'border-blue-200 bg-secondary-0 text-functional-disable-text',
      },
    ],
  },
)

export const menu = cva(
  [
    'absolute z-10 flex w-fit flex-col gap-4 border p-4',
    'rounded-[5px] border-functional-border-divider bg-white shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      isVisible: {
        false: 'invisible',
      },
    },
  },
)

export const dayButton = cva(
  'primary-body2 flex size-10 items-center justify-center',
  {
    variants: {
      status: {
        unselected: 'rounded-[5px] text-functional-title hover:bg-blue-0',
        'unselected-today':
          'rounded-[5px] font-semibold text-blue-700 hover:bg-blue-0',
        'selected-single':
          'rounded-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-start':
          'rounded-l-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-between':
          'bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-end':
          'rounded-r-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
      } satisfies Record<DateButtonStatus, ClassValue>,
      disabled: {
        true: 'text-functional-disable-text hover:bg-white',
      },
    },
  },
)
