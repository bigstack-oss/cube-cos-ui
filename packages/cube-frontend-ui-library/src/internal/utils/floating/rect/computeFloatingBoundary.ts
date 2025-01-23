import { splitPlacements } from '../splitPlacements'
import { Offsets, Placement, Size, XYBoundary } from '../types'
import { computeXBound } from './computeXBound'
import { computeYBound } from './computeYBound'

/**
 * Emulate the X and Y boundary of a floating element relative to the viewport.
 * TODO: Add unit tests.
 */
export const computeFloatingBoundary = (
  anchorDomRect: DOMRect,
  elementSize: Size,
  placement: Placement,
  offsets?: Offsets,
): XYBoundary => {
  const [verticalPlacement, horizontalPlacement] = splitPlacements(placement)

  const xBound = computeXBound(
    anchorDomRect,
    elementSize.width,
    horizontalPlacement,
    offsets?.x ?? 0,
  )

  const yBound = computeYBound(
    anchorDomRect,
    elementSize.height,
    verticalPlacement,
    offsets?.y ?? 0,
  )

  return {
    ...xBound,
    ...yBound,
  }
}
