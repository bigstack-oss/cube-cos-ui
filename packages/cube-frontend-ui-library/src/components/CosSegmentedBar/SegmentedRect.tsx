import { FillColorClass } from '@cube-frontend/ui-theme'
import { MouseEvent, Ref, useId } from 'react'
import { RectDimensions, rectHeight, RoundedSide } from './cosSegmentedBarUtils'

export type StatusRectProps = {
  // The `ref` prop is required for `CosTooltip` to function correctly.
  ref?: Ref<SVGRectElement>
  color: FillColorClass
  radius: number
  dimensions: RectDimensions
  roundedSide: RoundedSide
  onMouseEnter?: (e: MouseEvent<SVGRectElement>) => void
  onMouseLeave?: (e: MouseEvent<SVGRectElement>) => void
}

export const SegmentedRect = (props: StatusRectProps) => {
  const {
    ref,
    color,
    radius,
    dimensions,
    roundedSide,
    onMouseEnter,
    onMouseLeave,
  } = props

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
        ref={ref}
        id={cssCompatibleId}
        className={color}
        width={getWidth()}
        height={rectHeight}
        x={getX()}
        rx={getRx()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  )
}
