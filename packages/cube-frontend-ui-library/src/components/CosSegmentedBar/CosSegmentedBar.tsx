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
import { twMerge } from 'tailwind-merge'
import { cubeTheme } from '@cube-frontend/ui-theme'

export type CosSegmentedBarProps = PropsWithClassName & {
  /**
   * By default, the  matches its parent's width.
   * Use this prop to set a fixed width if the parent's width is unknown
   * (e.g., in a table cell) or a specific width is needed.
   */
  width?: number
  /**
   * The start and end x-ticks may be cut-off,
   * so we have to add padding to ensure they are fully visible.
   */
  paddingX?: number
  barMarginTop?: number
  /**
   * @default false
   */
  rounded?: boolean
  segments: Segment[]
  onMouseEnterSegment?: (index: number, e: MouseEvent<SVGRectElement>) => void
  onMouseLeaveSegment?: (index: number, e: MouseEvent<SVGRectElement>) => void
  overlay?: (barWidth: number, svgHeight: number) => ReactNode
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
    barMarginTop = 0,
    paddingX = 0,
    rounded = false,
    segments,
    onMouseEnterSegment,
    onMouseLeaveSegment,
    childrenDimensions,
    children,
    overlay,
  } = props

  if (width !== undefined && width <= 0) {
    throw new Error('width must be greater than 0')
  }

  /**
   * To ensure that the left-most and right-most rounded sides are display correctly,
   * we need to filter out segments with 0 cols.
   */
  const displaySegments = useMemo<Segment[]>(
    () => segments.filter((segment) => segment.colCount > 0),
    [segments],
  )

  const { svgRef, barWidth: containerWidth } = useSegmentedBarWidth(width)
  const contentWidth = containerWidth - paddingX * 2

  const totalColCount = useMemo<number>(
    () => displaySegments.reduce((sum, segment) => sum + segment.colCount, 0),
    [displaySegments],
  )

  const rectDimensions = useMemo<RectDimensions[]>(() => {
    const result: RectDimensions[] = []
    let accumulatedLeft = 0

    displaySegments.forEach((segment) => {
      const width = contentWidth * (segment.colCount / totalColCount)

      result.push({
        width,
        left: accumulatedLeft,
      })

      accumulatedLeft += width
    })

    return result
  }, [displaySegments, totalColCount, contentWidth])

  const computeRoundedSide = (index: number): RoundedSide => {
    const isFirst = index === 0
    const isLast = index === displaySegments.length - 1

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

  const svgHeight = computeSvgHeight(
    rectHeight,
    barMarginTop,
    childrenDimensions,
  )

  const childrenContent = children?.(contentWidth)
  const overlayContent = overlay?.(contentWidth, svgHeight)

  return (
    <svg
      ref={svgRef}
      className={twMerge('relative', className)}
      viewBox={`0 0 ${containerWidth} ${svgHeight}`}
      width={containerWidth}
      height={svgHeight}
    >
      <g transform={`translate(${paddingX}, 0)`}>
        <line
          x1={0}
          x2={contentWidth}
          strokeWidth={2}
          stroke={cubeTheme.colors.functional['border-divider']}
        />
        <g transform={`translate(0, ${barMarginTop})`}>
          {displaySegments.map((segment, index) => (
            <CosTooltip
              key={index}
              placement="top-follow-cursor"
              hoverContent={segment.hoverContent}
            >
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
        </g>
        {overlayContent && (
          <g width="100%" className="pointer-events-none absolute left-0 top-0">
            {overlayContent}
          </g>
        )}
      </g>
    </svg>
  )
}
