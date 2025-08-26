import { cva } from 'class-variance-authority'
import { CosButtonUsage } from './CosButton'
import { ClassValue } from 'class-variance-authority/types'

export const button = cva(
  'flex shrink-0 items-center justify-center gap-x-2 rounded-[5px] font-urbanist font-semibold transition-colors',
  {
    variants: {
      type: {
        primary: [
          'bg-primary text-grey-0',
          'hover:bg-functional-hover-primary',
        ],
        secondary: [
          'border border-primary bg-grey-0 text-primary',
          'hover:border-functional-hover-primary hover:bg-functional-hover-secondary',
        ],
        ghost: [
          'bg-transparent text-primary',
          'hover:bg-functional-hover-secondary',
        ],
        warning: [
          'border border-status-negative bg-grey-0 text-status-negative',
          'hover:bg-status-negative hover:text-grey-0',
        ],
        light: ['bg-secondary text-dark-400', 'hover:bg-secondary-400'],
      },
      size: {
        sm: 'secondary-body3 h-[26px] px-3 py-[5px]',
        md: 'secondary-body2 h-[34px] px-4 py-2',
        lg: 'secondary-body2 h-[42px] px-5 py-3',
      },
      usage: {} as Record<NonNullable<CosButtonUsage>, ClassValue>,
      loading: {
        true: 'cursor-default',
        false: '',
      },
      disabled: {
        true: 'cursor-default',
        false: '',
      },
    },
    compoundVariants: [
      { usage: 'icon-only', size: 'sm', className: 'p-[5px]' },
      { usage: 'icon-only', size: 'md', className: 'p-2' },
      { usage: 'icon-only', size: 'lg', className: 'p-3' },
      {
        type: 'primary',
        disabled: true,
        className: [
          'bg-functional-disable-light text-functional-disable-text',
          'hover:bg-functional-disable-light hover:text-functional-disable-text',
        ],
      },
      {
        type: 'primary',
        loading: true,
        className: [
          [
            'bg-functional-disable-light text-functional-border-darker',
            'hover:text-functional-border-darker',
          ],
        ],
      },
      {
        type: 'secondary',
        disabled: true,
        className: [
          'border-functional-disable-text bg-grey-0 text-functional-disable-text',
          'hover:border-functional-disable-text hover:bg-grey-0',
        ],
      },
      {
        type: 'secondary',
        loading: true,
        className: [
          'border-functional-border-darker bg-grey-0 text-functional-border-darker',
          'hover:border-functional-border-darker hover:text-functional-border-darker',
        ],
      },
      {
        type: 'ghost',
        disabled: true,
        className: [
          'bg-transparent text-functional-disable-text',
          'text-functional-disable-text hover:bg-transparent',
        ],
      },
      {
        type: 'ghost',
        loading: true,
        className: 'bg-transparent text-functional-border-darker',
      },
      {
        type: 'warning',
        disabled: true,
        className: [
          'border-red-100 bg-grey-0 text-red-100',
          'hover:border-red-100 hover:bg-grey-0 hover:text-red-100',
        ],
      },
      {
        type: 'warning',
        loading: true,
        className: [
          'border-red-200 bg-grey-0 text-red-200',
          'hover:text-red-200',
        ],
      },
      {
        type: 'light',
        disabled: true,
        className: [
          'bg-secondary-50 text-functional-disable-text',
          'hover:bg-secondary-50 hover:text-functional-disable-text',
        ],
      },
      {
        type: 'light',
        loading: true,
        className: [
          'bg-secondary-50 text-functional-border-darker',
          'hover:text-functional-border-darker',
        ],
      },
      /**
       * We expect the button only show the loading spinner when the usage is 'text-only'.
       *
       * disabled:relative => position the absolute positioned spinner relative to the button.
       * disabled:text-transparent => hide the text but keep the button's width and height.
       */
      {
        usage: 'text-only',
        loading: true,
        className: 'relative text-transparent hover:text-transparent',
      },
    ],
  },
)

export const iconContainer = cva('flex items-center justify-center', {
  variants: {
    size: {
      sm: 'size-[16px]',
      md: 'size-[18px]',
      lg: 'size-[18px]',
    },
  },
})

export const loadingSpinner = cva(undefined, {
  variants: {
    type: {
      primary: 'text-functional-border-darker',
      secondary: 'text-functional-border-darker',
      ghost: 'text-functional-border-darker',
      warning: 'text-red-200',
      light: 'text-functional-border-darker',
    },
    /**
     * The button should only show the loading spinner when the usage is 'text-only',
     * so we need to center the absolute positioned spinner within the button.
     */
    usage: {
      'text-only':
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    } as Record<NonNullable<CosButtonUsage>, ClassValue>,
  },
})

export const buttonSkeleton = cva(undefined, {
  variants: {
    size: {
      sm: 'h-[26px]',
      md: 'h-[34px]',
      lg: 'h-[42px]',
    },
    usage: {
      'text-only': '',
      'icon-only': '',
      'icon-left': '',
      'icon-right': '',
    },
  },
  compoundVariants: [
    {
      usage: 'text-only',
      size: 'sm',
      className: 'w-[104px]',
    },
    {
      usage: 'text-only',
      size: 'md',
      className: 'w-[118px]',
    },
    {
      usage: 'text-only',
      size: 'lg',
      className: 'w-[126px]',
    },

    {
      usage: 'icon-only',
      size: 'sm',
      className: 'w-[26px]',
    },
    {
      usage: 'icon-only',
      size: 'md',
      className: 'w-[34px]',
    },
    {
      usage: 'icon-only',
      size: 'lg',
      className: 'w-[42px]',
    },

    {
      usage: ['icon-left', 'icon-right'],
      size: 'sm',
      className: 'w-[128px]',
    },
    {
      usage: ['icon-left', 'icon-right'],
      size: 'md',
      className: 'w-[144px]',
    },
    {
      usage: ['icon-left', 'icon-right'],
      size: 'lg',
      className: 'w-[156px]',
    },
  ],
})
