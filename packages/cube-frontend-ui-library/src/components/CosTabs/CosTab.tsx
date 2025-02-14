import { cva } from 'class-variance-authority'
import { createElement, MouseEvent } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { DotSpan } from './DotSpan'
import { CosNumberSpan } from '../../internal/components/CosNumberSpan/CosNumberSpan'

export type CosTabProps = {
  label: string
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
  'secondary-body2 flex min-h-[34px] max-w-[200px] items-center justify-center border-b-2 px-2.5 py-2',
  {
    variants: {
      isActive: {
        false: ['border-b-transparent text-functional-text-light'],
      },
      disabled: {
        false: [
          'cursor-pointer font-medium hover:text-functional-hover-primary',
        ],
        true: [
          'cursor-default border-b-transparent text-functional-disable-text',
        ],
      },
    },
    compoundVariants: [
      {
        isActive: true,
        disabled: false,
        className: 'border-b-cosmos-primary font-semibold text-cosmos-primary',
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
    label,
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
      data-label={label}
      className={twJoin(
        'inline-flex flex-col items-center',
        // Use pseudo element to avoid slight layout shift caused by the font weight changes between inactive and active states.
        'before:secondary-body2 before:pointer-events-none before:invisible before:h-0 before:select-none before:font-semibold before:content-[attr(data-label)]',
      )}
    >
      {label}
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
      renderLabel(),
      renderDecoration(),
    )
  }

  return renderTab()
}
