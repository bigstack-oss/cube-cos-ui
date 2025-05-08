import { HorizontalPlacement, Placement, VerticalPlacement } from './types'

// TODO: Add unit tests.
export const splitPlacements = (
  placement: Placement,
): [VerticalPlacement, HorizontalPlacement] => {
  const [verticalPlacement, ...horizontalPlacementParts] = placement.split('-')
  const horizontalPlacement = horizontalPlacementParts.join('-')
  return [verticalPlacement, horizontalPlacement] as [
    VerticalPlacement,
    HorizontalPlacement,
  ]
}
