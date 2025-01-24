import { splitPlacements } from '../splitPlacements'
import { Placement, VerticalPlacement, XYBoundary } from '../types'

export const computeIdealPlacement = (
  placement: Placement,
  overflowPx: XYBoundary,
): Placement => {
  const [vertical, horizontal] = splitPlacements(placement)

  let newVertical = vertical
  let newHorizontal = horizontal

  if (shouldFlipVertically(vertical, overflowPx)) {
    newVertical = flipVerticalPlacement(vertical)
  }

  if (overflowPx.left > 0) {
    // Content is clipped on the left.
    // Anchor the floating element to the left.
    newHorizontal = 'left'
  } else if (overflowPx.right > 0) {
    // Content is clipped on the right.
    // Anchor the floating element to the right.
    newHorizontal = 'right'
  }

  return `${newVertical}-${newHorizontal}`
}

const shouldFlipVertically = (
  verticalPlacement: VerticalPlacement,
  overflowPx: XYBoundary,
): boolean => {
  return (
    (verticalPlacement === 'top' && overflowPx.top > 0) ||
    (verticalPlacement === 'bottom' && overflowPx.bottom > 0)
  )
}

const flipVerticalPlacement = (
  verticalPlacement: VerticalPlacement,
): VerticalPlacement => {
  const flippedMap: Record<VerticalPlacement, VerticalPlacement> = {
    top: 'bottom',
    bottom: 'top',
  }
  return flippedMap[verticalPlacement]
}
