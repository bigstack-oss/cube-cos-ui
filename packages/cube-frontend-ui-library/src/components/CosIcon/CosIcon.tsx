import { cloneElement, ComponentProps, ReactElement } from 'react'
import { getContainerClasses, getIconClasses } from './utils'

import type SvgComponentInstance from '*.svg?react'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

export type SvgComponent = typeof SvgComponentInstance

export type CosIconFrameProps = {
  className?: string
  size?: IconSize
  onClick?: () => void
  children: ReactElement<ComponentProps<SvgComponent>>
}

export const CosIconFrame = (props: CosIconFrameProps) => {
  const { className: classNameProps, size = 'md', children, onClick } = props

  const containerClasses = getContainerClasses(size, classNameProps)
  const iconClasses = getIconClasses(size, children.props.className)

  const icon = cloneElement(children, { className: iconClasses })

  return (
    <div className={containerClasses} onClick={onClick}>
      {icon}
    </div>
  )
}
