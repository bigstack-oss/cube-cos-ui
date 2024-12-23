import React from 'react'
import classnames from 'classnames'

export type CubeButtonVariant = 'primary' | 'secondary' | 'ghost'

export type CubeButtonSize = 'sm' | 'md' | 'lg'

export type MyButtonProps = {
  /**
   * @default "primary"
   */
  variant?: CubeButtonVariant
  /**
   * @default "md"
   */
  size?: CubeButtonSize
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const getClassNames = (variant: CubeButtonVariant, size: CubeButtonSize) => {
  const baseClasses = classnames(
    'flex items-center justify-center rounded-[5px] font-urbanist transition-colors disabled:cursor-not-allowed',
  )

  const variantClasses: Record<CubeButtonVariant, string> = {
    primary: classnames([
      'bg-primary text-grey-0',
      'hover:bg-functional-hover-primary',
      'disabled:bg-functional-disable-light disabled:text-functional-disable-text',
    ]),
    secondary: classnames([
      'border border-primary bg-grey-0 text-primary',
      'hover:border-functional-hover-primary hover:bg-functional-hover-secondary',
      'disabled:border-functional-disable-text disabled:bg-grey-0 disabled:text-functional-disable-text',
    ]),
    ghost: classnames([
      'bg-transparent text-primary',
      'hover:border-functional-hover-primary hover:bg-functional-hover-secondary',
      'disabled:bg-transparent disabled:text-functional-disable-text',
    ]),
  }

  const sizeClasses: Record<CubeButtonSize, string> = {
    sm: classnames('px-3 py-[5px] text-secondary-body3'),
    md: classnames('px-4 py-2 text-secondary-body2'),
    lg: classnames('px-5 py-4 text-secondary-body2'),
  }

  return classnames(baseClasses, variantClasses[variant], sizeClasses[size])
}

export const Button = (props: MyButtonProps) => {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    children,
  } = props
  const className = getClassNames(variant, size)

  // eslint-disable-next-line no-console
  console.log(React.version)

  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  return (
    <button className={className} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  )
}
