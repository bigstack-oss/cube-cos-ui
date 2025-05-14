import { cva } from 'class-variance-authority'

// ====================================
// Dropdown Label Style
// ====================================
export const label = cva('primary-body3 font-semibold', {
  variants: {
    size: {
      md: 'mb-2',
      sm: 'mb-1.5',
    },
  },
})

// ====================================
// Dropdown Skeleton Style
// ====================================
export const skeleton = {
  container: cva('w-full', {
    variants: {
      size: {
        md: 'space-y-[8px]',
        sm: 'space-y-[6px]',
      },
    },
  }),
  input: cva('w-full', {
    variants: {
      size: {
        md: 'h-[38px]',
        sm: 'h-[34px]',
      },
    },
  }),
}

// ====================================
// Dropdown Trigger Style
// ====================================
export const trigger = {
  container: cva(
    'primary-body3 flex w-full items-center justify-between gap-x-3 rounded-[5px] border',
    {
      variants: {
        size: {
          md: 'h-[38px] min-w-[116px] max-w-[360px] px-4 py-[10px]',
          sm: 'h-[34px] min-w-[80px] max-w-[240px] px-3 py-2',
        },
        variant: {
          regular: '',
          withFilter: '',
        },
        dropdownOpen: {
          true: '',
          false: '',
        },
        isSelected: {
          true: '',
          false: '',
        },
        disabled: {
          true: '',
          false: '',
        },
      },
      compoundVariants: [
        // Regular Dropdown
        {
          variant: 'regular',
          dropdownOpen: false,
          isSelected: false,
          disabled: false,
          class: [
            'hover:border-functional-hover-primary',
            'border-functional-border-divider',
            'text-functional-text-light',
            'bg-white',
          ],
        },
        {
          variant: 'regular',
          dropdownOpen: false,
          isSelected: true,
          disabled: false,
          class: [
            'hover:border-functional-hover-primary',
            'border-functional-border-divider',
            'text-functional-text',
            'bg-white',
          ],
        },
        {
          variant: 'regular',
          dropdownOpen: false,
          isSelected: false,
          disabled: true,
          class: [
            'hover:border-functional-border-divider',
            'border-functional-border-divider',
            'text-functional-disable-text',
            'bg-white',
          ],
        },
        {
          variant: 'regular',
          dropdownOpen: false,
          isSelected: true,
          disabled: true,
          class: [
            'hover:border-functional-border-divider',
            'border-functional-border-divider',
            'text-functional-disable-text',
            'bg-white',
          ],
        },
        {
          variant: 'regular',
          dropdownOpen: true,
          isSelected: false,
          disabled: false,
          class: [
            'border-functional-hover-primary',
            'text-functional-text-light',
            'bg-white',
          ],
        },
        {
          variant: 'regular',
          dropdownOpen: true,
          isSelected: true,
          disabled: false,
          class: [
            'border-functional-hover-primary',
            'text-functional-text',
            'bg-white',
          ],
        },
        // Dropdown with filter
        {
          variant: 'withFilter',
          isSelected: false,
          disabled: false,
          class: [
            'hover:border-blue-700',
            'border-blue-700',
            'text-functional-text',
            'bg-white',
          ],
        },
        {
          variant: 'withFilter',
          isSelected: true,
          disabled: false,
          class: [
            'hover:border-blue-800 hover:bg-secondary-100',
            'border-blue-700',
            'text-blue-850',
            'bg-secondary-50',
          ],
        },
        {
          variant: 'withFilter',
          isSelected: false,
          disabled: true,
          class: [
            'hover:border-blue-200',
            'border-blue-200',
            'text-functional-disable-text',
            'bg-white',
          ],
        },
        {
          variant: 'withFilter',
          isSelected: true,
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
  ),
  icon: cva('icon-md shrink-0 transition-transform', {
    variants: {
      dropdownOpen: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
      disabled: {
        true: 'text-functional-disable-text',
        false: 'text-functional-text',
      },
    },
  }),
  count: cva('primary-body3', {
    variants: {
      variant: {
        regular: '',
        withFilter: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'regular',
        disabled: true,
        class: 'text-functional-disable-text',
      },
      {
        variant: 'regular',
        disabled: false,
        class: 'text-functional-text-light',
      },
      {
        variant: 'withFilter',
        disabled: true,
        class: 'text-functional-disable-text',
      },
      { variant: 'withFilter', disabled: false, class: 'text-blue-850' },
    ],
  }),
  clearButton: cva('icon-md text-functional-text-light', {
    variants: {
      disabled: {
        true: 'hidden',
      },
    },
  }),
}

// ====================================
// Dropdown Menu Style
// ====================================
export const menu = cva(
  [
    'z-10 overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      size: {
        md: 'max-h-[442px] min-w-[116px] max-w-[360px]',
        sm: 'max-h-[390px] min-w-[80px] max-w-[240px]',
      },
      dropdownOpen: { false: 'invisible' },
    },
  },
)

// ====================================
// Dropdown Filter Style
// ====================================
export const filter = {
  container: cva('relative flex shrink-0 items-center', {
    variants: {
      size: {
        md: '',
        sm: '',
      },
      type: {
        radio: '',
        checkbox: '',
      },
    },
    compoundVariants: [
      { size: 'md', type: 'radio', class: 'px-[24px] py-[10px]' },
      { size: 'md', type: 'checkbox', class: 'px-[22px] py-[11px]' },
      { size: 'sm', type: 'radio', class: 'px-[24px] py-[9px]' },
      { size: 'sm', type: 'checkbox', class: 'px-[16px] py-[9.5px]' },
    ],
  }),
  input: [
    'primary-body2 w-full rounded-[5px] px-4 py-[7px] outline-none',
    'bg-secondary-0 text-functional-text placeholder:text-functional-text-light',
  ],
  icon: cva('icon-md absolute shrink-0 text-functional-text', {
    variants: {
      size: {
        md: '',
        sm: '',
      },
      type: {
        radio: '',
        checkbox: '',
      },
    },
    compoundVariants: [
      { size: 'md', type: 'radio', class: 'right-[40px]' },
      { size: 'md', type: 'checkbox', class: 'right-[38px]' },
      { size: 'sm', type: 'radio', class: 'right-[40px]' },
      { size: 'sm', type: 'checkbox', class: 'right-[32px]' },
    ],
  }),
}

// ====================================
// Dropdown Item Style
// ====================================
export const item = {
  radio: cva('cursor-pointer truncate hover:bg-functional-hover-grey', {
    variants: {
      size: {
        md: 'primary-body3',
        sm: 'primary-body4',
      },
      variant: {
        regular: '',
        withFilter: '',
      },
      isSelected: {
        true: 'font-semibold',
      },
      disabled: {
        true: 'cursor-default text-functional-disable-text hover:bg-white',
      },
    },
    compoundVariants: [
      { size: 'md', variant: 'regular', class: 'px-[24px] py-[10px]' },
      { size: 'md', variant: 'withFilter', class: 'px-[24px] py-[10px]' },
      { size: 'sm', variant: 'regular', class: 'px-[24px] py-[9px]' },
      { size: 'sm', variant: 'withFilter', class: 'px-[24px] py-[9px]' },
    ],
  }),
  checkbox: cva('truncate hover:bg-functional-hover-grey', {
    variants: {
      size: {
        md: 'primary-body3',
        sm: 'primary-body4',
      },
      variant: {
        regular: '',
        withFilter: '',
      },
      isSelected: {
        true: 'font-semibold',
      },
      disabled: {
        true: 'cursor-default text-functional-disable-text hover:bg-white',
      },
    },
    compoundVariants: [
      { size: 'md', variant: 'regular', class: 'px-[22px] py-[11px]' },
      { size: 'md', variant: 'withFilter', class: 'px-[22px] py-[11px]' },
      { size: 'sm', variant: 'regular', class: 'px-[16px] py-[9.5px]' },
      { size: 'sm', variant: 'withFilter', class: 'px-[16px] py-[9.5px]' },
    ],
  }),
}
