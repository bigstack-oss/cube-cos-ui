import { TimePoint } from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'

export type HealthTimeTrackProps = {
  width: number
  timePoints: TimePoint[]
}

export const timeTrackHeight = 26

export const HealthTimeTrack = (props: HealthTimeTrackProps) => {
  const { width, timePoints } = props

  return (
    // TODO: Use `<g>`, `<text>`, and `<tspan>` to replace `<foreignObject>` and `<div>`s.
    <foreignObject
      className="primary-body6 text-functional-text-light"
      width={width}
      height={timeTrackHeight}
    >
      <div className="flex items-start justify-between">
        {timePoints.map((timePoint) => (
          <div key={timePoint.timestamp} className="text-center">
            {timePoint.labels.map((label, labelIndex) => (
              <div key={labelIndex}>{label}</div>
            ))}
          </div>
        ))}
      </div>
    </foreignObject>
  )
}
