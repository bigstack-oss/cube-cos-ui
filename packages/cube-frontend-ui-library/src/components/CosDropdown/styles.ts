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
  'icon-md shrink-0 transition-transform duration-300',
  {
    variants: {
      isOpen: {
        true: '-scale-y-100 transform',
      },
    },
  },
)

export const clearButton = cva('icon-md text-functional-text-light', {
  variants: {
    disabled: {
      true: 'hidden',
    },
  },
})

export const dropdownLabel = cva('primary-body3 font-semibold', {
  variants: {
    variant: {
      default: 'mb-2',
      'in-table': 'mb-1.5',
    },
  },
})

export const search = {
  container: cva('relative flex shrink-0 items-center', {
    variants: {
      variant: {
        default: '',
        'in-table': '',
      },
      type: {
        search: '',
        'search-checkbox': '',
      },
    },
    compoundVariants: [
      { variant: 'default', type: 'search', class: 'px-[24px] py-[10px]' },
      {
        variant: 'default',
        type: 'search-checkbox',
        class: 'px-[22px] py-[11px]',
      },
      { variant: 'in-table', type: 'search', class: 'px-[24px] py-[9px]' },
      {
        variant: 'in-table',
        type: 'search-checkbox',
        class: 'px-[16px] py-[9.5px]',
      },
    ],
  }),
  icon: cva('icon-md absolute shrink-0 text-functional-text', {
    variants: {
      variant: {
        default: '',
        'in-table': '',
      },
      type: {
        search: '',
        'search-checkbox': '',
      },
    },
    compoundVariants: [
      { variant: 'default', type: 'search', class: 'right-[40px]' },
      {
        variant: 'default',
        type: 'search-checkbox',
        class: 'right-[38px]',
      },
      { variant: 'in-table', type: 'search', class: 'right-[40px]' },
      {
        variant: 'in-table',
        type: 'search-checkbox',
        class: 'right-[32px]',
      },
    ],
  }),
}

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
  },
)

export const item = cva('truncate hover:bg-functional-hover-grey', {
  variants: {
    variant: {
      default: 'primary-body3',
      'in-table': 'primary-body4',
    },
    type: {
      regular: '',
      checkbox: '',
      search: '',
      'search-checkbox': '',
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
  compoundVariants: [
    { variant: 'default', type: 'regular', class: 'px-[24px] py-[10px]' },
    { variant: 'default', type: 'checkbox', class: 'px-[22px] py-[11px]' },
    { variant: 'default', type: 'search', class: 'px-[24px] py-[10px]' },
    {
      variant: 'default',
      type: 'search-checkbox',
      class: 'px-[22px] py-[11px]',
    },
    { variant: 'in-table', type: 'regular', class: 'px-[24px] py-[9px]' },
    { variant: 'in-table', type: 'checkbox', class: 'px-[16px] py-[9.5px]' },
    { variant: 'in-table', type: 'search', class: 'px-[24px] py-[9px]' },
    {
      variant: 'in-table',
      type: 'search-checkbox',
      class: 'px-[16px] py-[9.5px]',
    },
  ],
})

export const skeleton = {
  container: cva('w-full', {
    variants: {
      variant: {
        default: 'space-y-[8px]',
        'in-table': 'space-y-[6px]',
      },
    },
  }),
  input: cva('w-full', {
    variants: {
      variant: {
        default: 'h-[38px]',
        'in-table': 'h-[34px]',
      },
    },
  }),
}
