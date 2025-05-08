import { HorizontalPlacement, XBoundary } from '../types'

/**
 * Emulate the X boundary of a floating element relative to the viewport.
 * TODO: Add unit tests.
 */
export const computeXBound = (
  anchorDomRect: DOMRect,
  elementWidth: number,
  horizontalPlacement: HorizontalPlacement,
  xOffset: number,
  mouseX: number,
): XBoundary => {
  const fn = computeFn[horizontalPlacement]
  return fn(anchorDomRect, elementWidth, xOffset, mouseX)
}

const computeFn: Record<
  HorizontalPlacement,
  (
    anchorDomRect: DOMRect,
    elementWidth: number,
    xOffset: number,
    mouseX: number,
  ) => XBoundary
> = {
  left: (anchorDomRect, elementWidth, xOffset) => {
    const left = anchorDomRect.left - xOffset
    return {
      left,
      right: left + elementWidth,
    }
  },
  center: (anchorDomRect, elementWidth) => {
    // `center` horizontal placement is not affected by offsets.
    const left = anchorDomRect.left + anchorDomRect.width / 2 - elementWidth / 2
    return {
      left,
      right: left + elementWidth,
    }
  },
  right: (anchorDomRect, elementWidth, xOffset) => {
    const right = anchorDomRect.right + xOffset
    return {
      left: right - elementWidth,
      right,
    }
  },
  'follow-cursor': (_anchorDomRect, elementWidth, _xOffset, mouseX) => {
    // `follow-cursor'` horizontal placement is not affected by offsets.
    const left = mouseX - elementWidth / 2
    return {
      left,
      right: left + elementWidth,
    }
  },
}
