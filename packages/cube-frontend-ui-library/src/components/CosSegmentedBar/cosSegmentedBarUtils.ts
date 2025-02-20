import { FillColorClass } from '@cube-frontend/ui-theme'

export type RectDimensions = {
  width: number
  left: number
}

export type Segment = {
  color: FillColorClass
  colCount: number
}

export type RoundedSide = 'none' | 'left' | 'right' | 'both'

export const rectHeight = 9
