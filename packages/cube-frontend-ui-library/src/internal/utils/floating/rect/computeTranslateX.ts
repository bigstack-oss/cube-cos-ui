import { splitPlacements } from '../splitPlacements'
import { Placement, XYBoundary } from '../types'

// TODO: Add unit tests.
export const computeTranslateX = (
  placement: Placement,
  overflowPx: XYBoundary,
): number => {
  const [, horizontalPlacement] = splitPlacements(placement)

  // Translate X only effects `follow-cursor` horizontal placement.
  if (horizontalPlacement !== 'follow-cursor') return 0

  if (overflowPx.left > 0) {
    // Translate the element to the right if necessary.
    return overflowPx.left
  }

  if (overflowPx.right > 0) {
    // Translate the element to the left if necessary.
    return -1 * overflowPx.right
  }

  return 0
}
