import { useMemo } from 'react'
import { scaleTime } from 'd3'
import { FillColorClass } from '@cube-frontend/ui-theme'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import {
  HealthSegment,
  healthStatusColors,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/computeHealthSegments'

type TriangleProps = {
  size: number
  color: FillColorClass
}

const Triangle = (props: TriangleProps) => {
  const { size, color } = props

  const points = [
    [0, size], // bottom
    [-size / 2, 0], // top left
    [size / 2, 0], // top right
  ]
    .map((p) => p.join(','))
    .join(' ')

  return <polygon points={points} className={color} />
}

export type HealthIndicatorsProps = {
  segments: HealthSegment[]
  dateTimeRange: DateTimeRange
  xRange: [number, number]
  size: number
}

export const HealthIndicators = (props: HealthIndicatorsProps) => {
  const { size, dateTimeRange, xRange, segments } = props

  const xScale = useMemo(() => {
    return scaleTime().domain(dateTimeRange).range(xRange)
  }, [dateTimeRange, xRange])

  if (!segments.length) {
    return null
  }

  const ngSegments = segments.filter((s) => s.status === 'ng')
  const fixingSegments = segments.filter((s) => s.status === 'fixing')

  const renderIndicators = (
    segments: HealthSegment[],
    color: FillColorClass,
  ) => {
    return segments.map((segment, index) => {
      const x = xScale(segment.startDateTime)
      return (
        <g key={index} transform={`translate(${x}, 0)`}>
          <Triangle size={size} color={color} />
        </g>
      )
    })
  }

  return (
    <g>
      {renderIndicators(ngSegments, healthStatusColors.ng)}
      {renderIndicators(fixingSegments, healthStatusColors.fixing)}
    </g>
  )
}
