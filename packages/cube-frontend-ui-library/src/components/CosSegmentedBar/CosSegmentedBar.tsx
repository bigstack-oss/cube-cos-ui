import { PropsWithClassName } from '@cube-frontend/utils'
import { MouseEvent, ReactNode, useMemo } from 'react'
import { CosTooltip } from '../CosTooltip/CosTooltip'
import {
  ChildrenDimensions,
  computeChildrenTransform,
  computeSvgHeight,
  RectDimensions,
  rectHeight,
  RoundedSide,
  Segment,
} from './cosSegmentedBarUtils'
import { SegmentedRect } from './SegmentedRect'
import { useSegmentedBarWidth } from './useSegmentedBarWidth'

export type CosSegmentedBarProps = PropsWithClassName & {
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
  onMouseEnterSegment?: (index: number, e: MouseEvent<SVGRectElement>) => void
  onMouseLeaveSegment?: (index: number, e: MouseEvent<SVGRectElement>) => void
} & WithChildrenProps

type WithChildrenProps =
  | {
      childrenDimensions?: never
      children?: never
    }
  | {
      // TODO: find a more elegant way to measure children dimensions.
      childrenDimensions: ChildrenDimensions
      children: (barWidth: number) => ReactNode
    }

export const CosSegmentedBar = (props: CosSegmentedBarProps) => {
  const {
    className,
    width,
    rounded = false,
    segments,
    onMouseEnterSegment,
    onMouseLeaveSegment,
    childrenDimensions,
    children,
  } = props

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

  const svgHeight = computeSvgHeight(rectHeight, childrenDimensions)

  const childrenContent = children?.(barWidth)

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${barWidth} ${svgHeight}`}
      width={barWidth}
      height={svgHeight}
    >
      {segments.map((segment, index) => (
        <CosTooltip key={index} hoverContent={segment.hoverContent}>
          <SegmentedRect
            color={segment.color}
            radius={rectRadius}
            dimensions={rectDimensions[index]}
            roundedSide={computeRoundedSide(index)}
            onMouseEnter={(e) => onMouseEnterSegment?.(index, e)}
            onMouseLeave={(e) => onMouseLeaveSegment?.(index, e)}
          />
        </CosTooltip>
      ))}
      {!!childrenContent && (
        <g
          width="100%"
          transform={computeChildrenTransform(
            rectHeight,
            childrenDimensions?.marginTop,
          )}
        >
          {childrenContent}
        </g>
      )}
    </svg>
  )
}
