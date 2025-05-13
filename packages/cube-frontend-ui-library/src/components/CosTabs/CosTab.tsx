import { cva } from 'class-variance-authority'
import { createElement, MouseEvent } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { CosNumberSpan } from '../../internal/components/CosNumberSpan/CosNumberSpan'
import { DotSpan } from './DotSpan'

export type CosTabProps = {
  children: string
  // TODO: Support query params if necessary.
  href?: string
  isActive: boolean
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
} & (
  | { number: number; dot?: never }
  | { number?: never; dot: true }
  | { number?: never; dot?: never }
)

const tab = cva(
  'inline-block min-h-[34px] max-w-[200px] border-b border-b-functional-border-divider',
  {
    variants: {
      isActive: {
        false: 'text-functional-text-light',
      },
      disabled: {
        false: ['cursor-pointer hover:text-functional-hover-primary'],
        true: ['cursor-default text-functional-disable-text'],
      },
    },
    compoundVariants: [
      {
        isActive: true,
        disabled: false,
        className: 'border-b-cosmos-primary text-cosmos-primary',
      },
    ],
    defaultVariants: {
      isActive: false,
      disabled: false,
    },
  },
)

// Use an inner container with a default transparent border-bottom to avoid a
// slight layout shift when toggling between active and inactive states.
const innerContainer = cva(
  [
    'secondary-body2 flex items-center justify-center px-2.5 py-2',
    'border-b border-b-transparent',
  ],
  {
    variants: {
      isActive: {
        true: '',
        false: '',
      },
      disabled: {
        false: 'font-medium',
      },
    },
    compoundVariants: [
      {
        isActive: true,
        disabled: false,
        className: 'border-b-cosmos-primary font-semibold',
      },
    ],
    defaultVariants: {
      isActive: false,
      disabled: false,
    },
  },
)

export const CosTab = (props: CosTabProps) => {
  const {
    children,
    href,
    isActive,
    disabled = false,
    number,
    dot,
    onClick: onClickProp,
  } = props

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (!disabled) {
      onClickProp?.(e)
    }
  }

  const renderLabel = () => (
    <span
      data-label={children}
      className={twJoin(
        'inline-flex flex-col items-center',
        // Use pseudo element to avoid slight layout shift caused by the font weight changes between inactive and active states.
        'before:secondary-body2 before:pointer-events-none before:invisible before:h-0 before:select-none before:font-semibold before:content-[attr(data-label)]',
      )}
    >
      {children}
    </span>
  )

  const renderDecoration = () => {
    if (number !== undefined) {
      return <CosNumberSpan number={number} disabled={disabled} />
    } else if (dot) {
      return <DotSpan disabled={disabled} />
    } else {
      return undefined
    }
  }

  const renderTab = () => {
    const tagType: 'a' | 'span' = href && !disabled ? 'a' : 'span'

    const hrefAttribute = tagType === 'a' ? href : undefined

    return createElement(
      tagType,
      {
        className: twMerge(
          tab({
            isActive,
            disabled,
          }),
        ),
        href: hrefAttribute,
        onClick,
      },
      <div
        className={twMerge(
          innerContainer({
            isActive,
            disabled,
          }),
        )}
      >
        {renderLabel()}
        {renderDecoration()}
      </div>,
    )
  }

  return renderTab()
}
