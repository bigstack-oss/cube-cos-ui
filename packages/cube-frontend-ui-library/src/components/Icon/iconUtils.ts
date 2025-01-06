import classnames from 'classnames'

export type IconProps = {
  className?: string
  /**
   * @default 'md'
   */
  size?: IconSize
}

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeClasses: Record<IconSize, string> = {
  // TODO: Find a proper way to not using classnames just for eslint check.
  sm: classnames('icon-sm'),
  md: classnames('icon-md'),
  lg: classnames('icon-lg'),
  xl: classnames('icon-xl'),
}

export const computeIconClassName = (props: IconProps): string => {
  const { className: classNameProp, size = 'md' } = props
  const sizeClass = sizeClasses[size]
  return classnames(sizeClass, classNameProp)
}
