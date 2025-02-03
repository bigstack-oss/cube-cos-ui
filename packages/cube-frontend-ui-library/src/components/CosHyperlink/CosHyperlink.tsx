import { IconSize, SvgComponent } from '../CosIcon/CosIcon'
import { createElement } from 'react'
import { cva } from 'class-variance-authority'
import { twJoin, twMerge } from 'tailwind-merge'
import { getIconSizeClass } from '../CosIcon/utils'

export type CosHyperlinkColor = 'primary' | 'secondary'

export type CosHyperlinkVariant =
  | 'text-only'
  | 'text-inline'
  | 'icon-left'
  | 'icon-right'

export type CosHyperlinkSize = 'sm' | 'md'

type BaseHyperlinkProps = {
  color?: CosHyperlinkColor
  size?: CosHyperlinkSize
  disabled?: boolean
  children: string
  href: string
}

export type CosHyperlinkProps = BaseHyperlinkProps &
  (
    | {
        variant: Extract<CosHyperlinkVariant, 'icon-left' | 'icon-right'>
        Icon: SvgComponent
      }
    | {
        variant: Extract<CosHyperlinkVariant, 'text-only' | 'text-inline'>
        Icon?: never
      }
  )

const hyperlink = cva(['flex items-center gap-x-1 font-medium'], {
  variants: {
    color: {
      primary: [
        'text-primary',
        'hover:text-functional-hover-primary',
        'visited:text-primary-700',
      ],
      secondary: [
        'text-functional-border-darker',
        'hover:text-functional-text-light',
        'visited:text-functional-border-darker',
      ],
    },
    size: {
      md: 'primary-body2',
      sm: 'primary-body4',
    },
    variant: {
      'text-only': '',
      'text-inline': 'underline underline-offset-4',
      'icon-left': '',
      'icon-right': '',
    },
    disabled: {
      true: 'text-functional-disable-text hover:cursor-default hover:text-functional-disable-text',
    },
  },
})

export const CosHyperlink = (props: CosHyperlinkProps) => {
  const {
    color = 'primary',
    size = 'md',
    variant = 'text-only',
    disabled = false,
    children,
    href,
  } = props

  const renderIcon = (iconVariant: 'icon-left' | 'icon-right') => {
    if (props.variant !== iconVariant) {
      return null
    }

    const { Icon } = props

    const sizeMapping: Record<
      CosHyperlinkSize,
      { iconSize: IconSize; iconFrameSize: string }
    > = {
      sm: { iconSize: 'sm', iconFrameSize: twJoin('size-[15px]') },
      md: { iconSize: 'md-sm', iconFrameSize: twJoin('size-[17px]') },
    }
    const { iconSize, iconFrameSize } = sizeMapping[size]
    const iconSizeClass = getIconSizeClass(iconSize)

    return (
      <div
        className={twMerge('flex items-center justify-center', iconFrameSize)}
      >
        <Icon className={iconSizeClass} />
      </div>
    )
  }

  const renderHyperlink = () => {
    const hyperlinkType: 'a' | 'div' = !disabled ? 'a' : 'div'

    const hrefAttribute = hyperlinkType === 'a' ? href : undefined

    return createElement(
      hyperlinkType,
      {
        className: twMerge(hyperlink({ color, size, variant, disabled })),
        href: hrefAttribute,
      },
      renderIcon('icon-left'),
      children,
      renderIcon('icon-right'),
    )
  }

  return renderHyperlink()
}
