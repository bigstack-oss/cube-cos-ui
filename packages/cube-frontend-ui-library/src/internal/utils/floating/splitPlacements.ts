import { HorizontalPlacement, Placement, VerticalPlacement } from './types'

// TODO: Add unit tests.
export const splitPlacements = (
  placement: Placement,
): [VerticalPlacement, HorizontalPlacement] => {
  return placement.split('-') as [VerticalPlacement, HorizontalPlacement]
}
