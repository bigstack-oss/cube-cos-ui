import { CSSProperties } from 'react'

export type VerticalPlacement = 'top' | 'bottom'

export type HorizontalPlacement = 'left' | 'center' | 'right'

export type Placement = `${VerticalPlacement}-${HorizontalPlacement}`

export type Offsets = {
  x?: number
  y?: number
}

export type FloatingStyle = Pick<CSSProperties, 'top' | 'left' | 'transform'>

export type XBoundary = {
  left: number
  right: number
}

export type YBoundary = {
  top: number
  bottom: number
}

export type XYBoundary = XBoundary & YBoundary

export type Size = {
  width: number
  height: number
}

export type TranslationOffsets = {
  x: number
  y: number
}
