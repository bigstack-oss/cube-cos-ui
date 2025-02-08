import { cva } from 'class-variance-authority'

export const trigger = cva(
  'primary-body3 flex w-full items-center justify-between gap-x-3 rounded-[5px] border',
  {
    variants: {
      variant: {
        default: 'min-w-[116px] max-w-[360px] px-4 py-[10px]',
        'in-table': 'min-w-[80px] max-w-[240px] px-3 py-2',
      },
      hasSearchbar: {
        true: '',
        false: '',
      },
      hasSelectedValue: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Default Dropdown
      {
        hasSearchbar: false,
        hasSelectedValue: false,
        disabled: false,
        class: [
          'hover:border-functional-hover-primary',
          'border-functional-border-divider',
          'text-functional-border-darker',
          'bg-white',
        ],
      },
      {
        hasSearchbar: false,
        hasSelectedValue: true,
        disabled: false,
        class: [
          'hover:border-functional-hover-primary',
          'border-functional-border-divider',
          'text-functional-text',
          'bg-white',
        ],
      },
      {
        hasSearchbar: false,
        hasSelectedValue: false,
        disabled: true,
        class: [
          'hover:border-functional-border-divider',
          'border-functional-border-divider',
          'text-functional-disable-text',
          'bg-white',
        ],
      },
      {
        hasSearchbar: false,
        hasSelectedValue: true,
        disabled: true,
        class: [
          'hover:border-functional-border-divider',
          'border-functional-border-divider',
          'text-functional-disable-text',
          'bg-white',
        ],
      },
      // Default Dropdown - with searchbar
      {
        hasSearchbar: true,
        hasSelectedValue: false,
        disabled: false,
        class: [
          'hover:border-blue-700',
          'border-blue-700',
          'text-functional-text',
          'bg-white',
        ],
      },
      {
        hasSearchbar: true,
        hasSelectedValue: true,
        disabled: false,
        class: [
          'hover:border-blue-800 hover:bg-secondary-100',
          'border-blue-700',
          'text-blue-850',
          'bg-secondary-50',
        ],
      },
      {
        hasSearchbar: true,
        hasSelectedValue: false,
        disabled: true,
        class: [
          'hover:border-blue-200',
          'border-blue-200',
          'text-functional-disable-text',
          'bg-white',
        ],
      },
      {
        hasSearchbar: true,
        hasSelectedValue: true,
        disabled: true,
        class: [
          'hover:border-blue-200',
          'border-blue-200',
          'text-functional-disable-text',
          'bg-secondary-0',
        ],
      },
    ],
  },
)

export const triggerIcon = cva(
  'icon-md shrink-0 transition-transform duration-200',
  {
    variants: {
      isOpen: {
        true: 'rotate-180',
      },
    },
  },
)

export const content = cva(
  [
    'absolute z-10 overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      isVisible: {
        false: 'hidden',
      },
      variant: {
        default: 'max-h-[442px] min-w-[116px] max-w-[360px]',
        'in-table': 'max-h-[390px] min-w-[80px] max-w-[240px]',
      },
      verticalPlacement: {
        top: '',
        bottom: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        verticalPlacement: 'top',
        class: 'bottom-[calc(100%+8px)]',
      },
      {
        variant: 'default',
        verticalPlacement: 'bottom',
        class: 'top-[calc(100%+8px)]',
      },
      {
        variant: 'in-table',
        verticalPlacement: 'top',
        class: 'bottom-[calc(100%+8px)]',
      },
      {
        variant: 'in-table',
        verticalPlacement: 'bottom',
        class: 'top-[calc(100%+8px)]',
      },
    ],
  },
)

export const item = cva(
  'flex items-center truncate whitespace-nowrap hover:bg-functional-hover-grey',
  {
    variants: {
      variant: {
        default: 'primary-body3 px-[22px] py-[11px]',
        'in-table': 'primary-body4 px-6 py-[9px]',
      },
      isSelected: {
        true: 'font-semibold',
      },
      isCheckbox: {
        false: 'cursor-pointer',
      },
      disabled: {
        true: 'cursor-default text-functional-disable-text hover:bg-white',
      },
    },
  },
)
