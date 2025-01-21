import { cva } from 'class-variance-authority'

export const trigger = cva(
  [
    'primary-body3 flex items-center justify-between gap-x-3 rounded-[5px] text-functional-text',
    'border bg-white text-functional-border-darker',
  ],
  {
    variants: {
      variant: {
        default: [
          'min-w-[116px] max-w-[360px] px-4 py-[10px]',
          'border-functional-border-divider',
          'hover:border-functional-hover-primary focus:border-functional-hover-primary',
        ],
        'in-table': [
          'min-w-[80px] max-w-[240px] px-3 py-2',
          'border-functional-border-divider',
          'hover:border-functional-hover-primary focus:border-functional-hover-primary',
        ],
        filter: ['min-w-[80px] max-w-[240px] px-3 py-2', 'border-blue-700'],
      },
      disabled: {
        true: 'text-functional-disable-text',
      },
      isSelected: {
        true: 'text-functional-text',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        disabled: true,
        class:
          'border-functional-border-divider hover:border-functional-border-divider',
      },
      {
        variant: 'default',
        isSelected: true,
        class: 'border-functional-hover-primary',
      },
      {
        variant: 'in-table',
        disabled: true,
        class:
          'border-functional-border-divider hover:border-functional-border-divider',
      },
      {
        variant: 'in-table',
        isSelected: true,
        class: 'border-functional-hover-primary',
      },
      {
        variant: 'filter',
        disabled: true,
        class: 'border-blue-200',
      },
      {
        variant: 'filter',
        isSelected: true,
        class: 'border-blue-800 bg-blue-100 text-blue-850',
      },
    ],
  },
)

export const content = cva(
  [
    'absolute z-10 overflow-scroll rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      variant: {
        default: 'max-h-[442px] min-w-[116px] max-w-[360px]',
        'in-table': 'max-h-[390px] min-w-[80px] max-w-[240px]',
        filter: 'max-h-[442px] min-w-[80px] max-w-[240px]',
      },
    },
  },
)

export const item = {
  label: cva('py-2', {
    variants: {
      variant: { default: '', 'in-table': '', filter: '' },
      isSelected: { true: '' },
    },
  }),
  span: cva(
    [
      'flex items-center space-x-2',
      'peer-hover:cursor-pointer peer-hover:bg-functional-hover-grey',
      'peer-checked:font-semibold',
    ],
    {
      variants: {
        variant: {
          default: ['primary-body3'],
          'in-table': 'primary-body4',
          filter: 'primary-body3',
        },
        type: {
          radio: '',
          checkbox: '',
        },
        isSelected: { true: '' },
        disabled: {
          true: 'cursor-default text-functional-disable-text peer-hover:cursor-default peer-hover:bg-white',
        },
      },
      compoundVariants: [
        { variant: 'default', type: 'checkbox', class: 'px-[22px] py-[11px]' },
        { variant: 'default', type: 'radio', class: 'px-6 py-[10px]' },
        { variant: 'in-table', type: 'checkbox', class: 'px-4 py-[9.5px]' },
        { variant: 'in-table', type: 'radio', class: 'px-6 py-[9px]' },
        { variant: 'filter', type: 'checkbox', class: 'px-[22px] py-[11px]' },
        { variant: 'filter', type: 'radio', class: 'px-6 py-[10px]' },
      ],
    },
  ),
}
