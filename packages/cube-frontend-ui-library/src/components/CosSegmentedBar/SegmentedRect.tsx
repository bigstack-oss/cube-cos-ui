import { FillColorClass } from '@cube-frontend/ui-theme'
import { useId } from 'react'
import { RectDimensions, RoundedSide } from './cosSegmentedBarUtils'

export type StatusRectProps = {
  color: FillColorClass
  radius: number
  dimensions: RectDimensions
  roundedSide: RoundedSide
}

export const SegmentedRect = (props: StatusRectProps) => {
  const { color, radius, dimensions, roundedSide } = props

  const id = useId()

  const cssCompatibleId = id.replace(/:/g, '_')

  const renderOneSideRoundedStyle = () => {
    if (roundedSide === 'none' || roundedSide === 'both') {
      return undefined
    }

    const radiusPx = `${radius}px`

    // One side rounded rect is achieved by:
    // 1. Use `rx` to round both sides.
    // 2. Hide the unwanted rounded side with `clip-path: inset(...)`.
    // 3. Adjust the width to compensate for the hidden portion.
    const isLeftSideRounded = roundedSide === 'left'
    const insetLeft = isLeftSideRounded ? 0 : radiusPx
    const insetRight = isLeftSideRounded ? radiusPx : 0

    return (
      <style>
        {`#${cssCompatibleId} {
          clip-path: inset(0 ${insetRight} 0 ${insetLeft});
        }`}
      </style>
    )
  }

  const getWidth = (): number => {
    let width = dimensions.width

    if (roundedSide === 'left' || roundedSide === 'right') {
      // Add `rectRadius` due to inset.
      width += radius
    }

    return width
  }

  const getX = (): number => {
    let translateX = dimensions.left

    if (roundedSide === 'right') {
      translateX -= radius
    }

    return translateX
  }

  const getRx = (): number => {
    if (roundedSide === 'none') {
      return 0
    }
    return radius
  }

  return (
    <>
      {renderOneSideRoundedStyle()}
      <rect
        id={cssCompatibleId}
        className={color}
        width={getWidth()}
        height={dimensions.height}
        x={getX()}
        rx={getRx()}
      />
    </>
  )
}
