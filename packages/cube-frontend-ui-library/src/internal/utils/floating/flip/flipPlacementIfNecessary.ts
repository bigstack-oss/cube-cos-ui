import { splitPlacements } from '../splitPlacements'
import {
  HorizontalPlacement,
  Placement,
  VerticalPlacement,
  XYBoundary,
} from '../types'

export const flipPlacementIfNecessary = (
  placement: Placement,
  overflowPx: XYBoundary,
): Placement => {
  const [verticalPlacement, horizontalPlacement] = splitPlacements(placement)

  let newVerticalPlacement = verticalPlacement
  let newHorizontalPlacement = horizontalPlacement

  if (shouldFlipHorizontally(horizontalPlacement, overflowPx)) {
    newHorizontalPlacement = flipHorizontalPlacement(horizontalPlacement)
  }

  if (shouldFlipVertically(verticalPlacement, overflowPx)) {
    newVerticalPlacement = flipVerticalPlacement(verticalPlacement)
  }

  return `${newVerticalPlacement}-${newHorizontalPlacement}`
}

const shouldFlipHorizontally = (
  horizontalPlacement: HorizontalPlacement,
  overflowPx: XYBoundary,
): boolean => {
  return (
    (horizontalPlacement === 'left' && overflowPx.right > 0) ||
    (horizontalPlacement === 'right' && overflowPx.left > 0)
  )
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

const flipHorizontalPlacement = (
  horizontalPlacement: HorizontalPlacement,
): HorizontalPlacement => {
  const flippedMap: Record<HorizontalPlacement, HorizontalPlacement> = {
    left: 'right',
    center: 'center',
    right: 'left',
  }
  return flippedMap[horizontalPlacement]
}
