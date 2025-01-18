import { IconProps } from '../Icon/iconUtils'
import { createElement } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

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
        Icon: React.ComponentType<IconProps>
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

  const renderLeftIcon = () => {
    if (variant === 'icon-left') {
      const { Icon } = props
      return Icon && <Icon size={size} />
    }
    return undefined
  }

  const renderRightIcon = () => {
    if (variant === 'icon-right') {
      const { Icon } = props
      return Icon && <Icon size={size} />
    }
    return undefined
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
      renderLeftIcon(),
      children,
      renderRightIcon(),
    )
  }

  return renderHyperlink()
}
