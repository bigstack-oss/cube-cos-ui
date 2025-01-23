import { splitPlacements } from '../splitPlacements'
import { Placement, TranslationOffsets, XYBoundary } from '../types'
import { computeTranslateX } from './computeTranslateX'
import { computeTranslateY } from './computeTranslateY'

// TODO: Add unit tests.
export const computeTranslate = (
  placement: Placement,
  overflowPx: XYBoundary,
): TranslationOffsets => {
  const [verticalPlacement, horizontalPlacement] = splitPlacements(placement)
  const translateX = computeTranslateX(horizontalPlacement, overflowPx)
  const translateY = computeTranslateY(verticalPlacement, overflowPx)
  return {
    x: translateX,
    y: translateY,
  }
}
