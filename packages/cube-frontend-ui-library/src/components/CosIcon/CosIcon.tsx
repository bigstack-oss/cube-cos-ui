import { cloneElement, ComponentProps, ReactElement } from 'react'
import { getContainerClasses, getIconClasses } from './utils'

import type SvgComponentInstance from '*.svg?react'

export type IconSize = 'xs' | 'sm' | 'md-sm' | 'md' | 'lg' | 'xl'

export type SvgComponent = typeof SvgComponentInstance

export type SvgElement = ReactElement<ComponentProps<SvgComponent>>

export type CosIconFrameProps = {
  className?: string
  size?: IconSize
  onClick?: () => void
  children: SvgElement
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
