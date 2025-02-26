import { MouseEvent, Ref } from 'react'

export type InteractiveElementProps = {
  ref?: Ref<HTMLElement>
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export type CosTooltipInformation = {
  title?: string
  subtext?: string
  message: string
}

export type VisibilityState = 'hover' | 'click' | undefined
