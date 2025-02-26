import { FillColorClass } from '@cube-frontend/ui-theme'
import { CosTooltipInformation } from '../CosTooltip/types'

export type RectDimensions = {
  width: number
  left: number
}

export type Segment = {
  color: FillColorClass
  colCount: number
  hoverContent?: CosTooltipInformation
}

export type RoundedSide = 'none' | 'left' | 'right' | 'both'

export const rectHeight = 9
