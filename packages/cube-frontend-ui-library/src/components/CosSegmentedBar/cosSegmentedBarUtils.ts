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

export type ChildrenDimensions = {
  height: number
  /**
   * @default 0
   */
  marginTop?: number
}

export const computeSvgHeight = (
  baseHeight: number,
  childrenDimensions: ChildrenDimensions | undefined,
): number => {
  if (!childrenDimensions) {
    return baseHeight
  }
  const { height: childrenHeight, marginTop: childrenMarginTop = 0 } =
    childrenDimensions
  return baseHeight + childrenHeight + childrenMarginTop
}

export const computeChildrenTransform = (
  parentHeight: number,
  childrenMarginTop?: number,
): string => {
  const y = parentHeight + (childrenMarginTop ?? 0)
  return `translate(0, ${y})`
}
