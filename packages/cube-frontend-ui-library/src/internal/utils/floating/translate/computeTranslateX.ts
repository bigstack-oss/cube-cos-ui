import { HorizontalPlacement, XYBoundary } from '../types'

// TODO: Add unit tests.
export const computeTranslateX = (
  horizontalPlacement: HorizontalPlacement,
  overflowPx: XYBoundary,
): number => {
  if (horizontalPlacement === 'left' || horizontalPlacement === 'center') {
    // Translate the element to the right if necessary.
    if (overflowPx.left > 0) {
      return overflowPx.left
    }
  } else if (overflowPx.right > 0) {
    // Translate the element to the left if necessary.
    return -1 * overflowPx.right
  }

  return 0
}
