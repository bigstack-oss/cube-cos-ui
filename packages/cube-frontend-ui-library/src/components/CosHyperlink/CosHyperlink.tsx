import classnames from 'classnames'
import { IconProps } from '../Icon/iconUtils'

export type CosHyperlinkColor = 'primary' | 'secondary'

export type CosHyperlinkVariant =
  | 'text-only'
  | 'text-inline'
  | 'icon-left'
  | 'icon-right'

export type CosHyperlinkSize = 'sm' | 'md'

type BaseHyperlinkProps = {
  color?: CosHyperlinkColor
  size: CosHyperlinkSize
  text: string
  href: string
}

type IconHyperlinkProps = {
  variant: Extract<CosHyperlinkVariant, 'icon-left' | 'icon-right'>
  Icon: React.FC<IconProps>
}

type TextHyperlinkProps = {
  variant: Extract<CosHyperlinkVariant, 'text-only' | 'text-inline'>
  Icon?: never
}

export type CosHyperlinkProps = BaseHyperlinkProps &
  (IconHyperlinkProps | TextHyperlinkProps)

const getClassNames = (
  color: CosHyperlinkColor,
  size: CosHyperlinkSize,
  variant: CosHyperlinkVariant,
) => {
  const baseLinkClasses = 'flex items-center gap-x-1'

  const colorLinkClasses: Record<CosHyperlinkColor, string> = {
    primary: classnames(
      'text-primary',
      'hover:text-functional-hover-primary',
      'visited:text-primary-700',
      'disabled:text-functional-disable-text',
    ),
    secondary: classnames(
      'text-functional-border-darker',
      'hover:text-functional-text-light',
      'visited:text-functional-border-darker',
      'disabled:text-functional-disable-text',
    ),
  }

  const sizeLinkClasses: Record<CosHyperlinkSize, string> = {
    sm: 'primary-body4 font-medium',
    md: 'primary-body2 font-medium',
  }

  const variantLinkClasses: Record<CosHyperlinkVariant, string> = {
    'text-only': '',
    'text-inline': 'underline underline-offset-4',
    'icon-left': '',
    'icon-right': '',
  }

  return classnames(
    baseLinkClasses,
    colorLinkClasses[color],
    sizeLinkClasses[size],
    variantLinkClasses[variant],
  )
}

export const CosHyperlink = (props: CosHyperlinkProps) => {
  const {
    color = 'primary',
    size = 'md',
    variant = 'text-only',
    text,
    href,
  } = props

  const linkClasses = getClassNames(color, size, variant)

  const renderLeftIcon = () => {
    const { Icon } = props
    if (variant === 'icon-left' && Icon) {
      return <Icon size={size} />
    }
    return null
  }

  const renderRightIcon = () => {
    const { Icon } = props
    if (variant === 'icon-right' && Icon) {
      return <Icon size={size} />
    }
    return null
  }

  return (
    <a href={href} className={linkClasses}>
      {renderLeftIcon()}
      {text}
      {renderRightIcon()}
    </a>
  )
}

export default CosHyperlink
