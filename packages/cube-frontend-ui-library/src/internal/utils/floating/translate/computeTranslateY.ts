import { VerticalPlacement, XYBoundary } from '../types'

// TODO: Add unit tests.
export const computeTranslateY = (
  verticalPlacement: VerticalPlacement,
  overflowPx: XYBoundary,
): number => {
  if (verticalPlacement === 'top') {
    // Translate the element to the bottom if necessary.
    if (overflowPx.top > 0) {
      return overflowPx.top
    }
  } else if (overflowPx.bottom > 0) {
    // Translate the element to the top if necessary.
    return -1 * overflowPx.bottom
  }

  return 0
}
