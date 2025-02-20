import { useMemo } from 'react'
import {
  RectDimensions,
  rectHeight,
  RoundedSide,
  Segment,
} from './cosSegmentedBarUtils'
import { SegmentedRect } from './SegmentedRect'
import { useSegmentedBarWidth } from './useSegmentedBarWidth'

export type CosSegmentedBarProps = {
  /**
   * By default, the  matches its parent's width.
   * Use this prop to set a fixed width if the parent's width is unknown
   * (e.g., in a table cell) or a specific width is needed.
   */
  width?: number
  /**
   * @default false
   */
  rounded?: boolean
  segments: Segment[]
}

export const CosSegmentedBar = (props: CosSegmentedBarProps) => {
  const { width, rounded = false, segments } = props

  if (width !== undefined && width <= 0) {
    throw new Error('width must be greater than 0')
  }

  const { svgRef, barWidth } = useSegmentedBarWidth(width)

  const totalColCount = useMemo<number>(
    () => segments.reduce((sum, segment) => sum + segment.colCount, 0),
    [segments],
  )

  const rectDimensions = useMemo<RectDimensions[]>(() => {
    const result: RectDimensions[] = []
    let accumulatedLeft = 0

    segments.forEach((segment) => {
      const width = barWidth * (segment.colCount / totalColCount)

      result.push({
        width,
        left: accumulatedLeft,
      })

      accumulatedLeft += width
    })

    return result
  }, [segments, totalColCount, barWidth])

  const computeRoundedSide = (index: number): RoundedSide => {
    const isFirst = index === 0
    const isLast = index === segments.length - 1

    if (isFirst && isLast) {
      // There's only 1 segment.
      return 'both'
    } else if (isFirst) {
      return 'left'
    } else if (isLast) {
      return 'right'
    }

    return 'none'
  }

  // Similar to `border-radius: 50%`.
  const rectRadius = useMemo<number>(() => {
    if (rounded) {
      return Math.ceil(rectHeight / 2)
    } else {
      return 0
    }
  }, [rounded])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${barWidth} ${rectHeight}`}
      width={barWidth}
      height={rectHeight}
    >
      {segments.map((segment, index) => (
        <SegmentedRect
          key={index}
          color={segment.color}
          radius={rectRadius}
          dimensions={rectDimensions[index]}
          roundedSide={computeRoundedSide(index)}
        />
      ))}
    </svg>
  )
}
