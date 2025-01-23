import { HorizontalPlacement, VerticalPlacement } from '../types'

export const flipVerticalPlacement = (
  verticalPlacement: VerticalPlacement,
): VerticalPlacement => {
  const flippedMap: Record<VerticalPlacement, VerticalPlacement> = {
    top: 'bottom',
    bottom: 'top',
  }
  return flippedMap[verticalPlacement]
}

export const flipHorizontalPlacement = (
  horizontalPlacement: HorizontalPlacement,
): HorizontalPlacement => {
  const flippedMap: Record<HorizontalPlacement, HorizontalPlacement> = {
    left: 'right',
    center: 'center',
    right: 'left',
  }
  return flippedMap[horizontalPlacement]
}
