import { VerticalPlacement, YBoundary } from '../types'

/**
 * Emulate the Y boundary of a floating element relative to the viewport.
 * TODO: Add unit tests.
 */
export const computeYBound = (
  anchorDomRect: DOMRect,
  elementHeight: number,
  verticalPlacement: VerticalPlacement,
  yOffset: number,
): YBoundary => {
  const fn = computeFn[verticalPlacement]
  return fn(anchorDomRect, elementHeight, yOffset)
}

const computeFn: Record<
  VerticalPlacement,
  (anchorDomRect: DOMRect, elementHeight: number, yOffset: number) => YBoundary
> = {
  top: (anchorDomRect, elementHeight, yOffset) => {
    const bottom = anchorDomRect.top - yOffset
    return {
      top: bottom - elementHeight,
      bottom,
    }
  },
  bottom: (anchorDomRect, elementHeight, yOffset) => {
    const top = anchorDomRect.bottom + yOffset
    return {
      top,
      bottom: top + elementHeight,
    }
  },
}
