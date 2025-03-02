import { MouseEvent, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import { ContentSwitcherSize, CosContentSwitcherContext } from './utils'
import { ClassValue } from 'class-variance-authority/types'

export type ContentSwitcherItemProps = {
  isActive: boolean
  disabled?: boolean
  children: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const contentSwitcherItem = cva(
  [
    'flex items-center justify-center',
    'border-y border-primary-200 bg-grey-0 font-medium text-functional-text-light transition-colors',
    'first-of-type:rounded-l-[5px] first-of-type:border-l',
    'last-of-type:rounded-r-[5px] last-of-type:border-r',
  ],
  {
    variants: {
      size: {
        sm: 'secondary-body5 h-6 min-w-[64px] max-w-[80px] px-[19px] py-[6px]',
        md: 'secondary-body2 h-8 min-w-[100px] max-w-[156px] px-[36px] py-[7px]',
      } satisfies Record<ContentSwitcherSize, ClassValue>,
      isActive: {
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
        isActive: true,
        disabled: false,
        className: 'bg-primary-200 text-functional-text',
      },
      {
        isActive: false,
        disabled: false,
        className: 'hover:bg-functional-hover-secondary',
      },
      {
        disabled: true,
        className: 'text-functional-disable-text',
      },
    ],
  },
)

export const CosContentSwitcherItem = (props: ContentSwitcherItemProps) => {
  const { isActive, disabled = false, children, onClick } = props

  const size = useContext(CosContentSwitcherContext)
  const className = twMerge(contentSwitcherItem({ isActive, disabled, size }))

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
