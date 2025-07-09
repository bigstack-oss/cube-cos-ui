import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { TIME_AXIS_HEIGHT, TimeAxis } from './TimeAxis'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'

export type HealthZoomedTimeBarProps = {
  paddingX: number
  history: GetModuleHealthHistoryResponseDataHistoryInner[]
  dateTimeRange: DateTimeRange
}

export const HealthZoomedTimeBar = (props: HealthZoomedTimeBarProps) => {
  const { paddingX, history, dateTimeRange } = props

  return (
    <div>
      <HealthSegmentedBar
        history={history}
        dateTimeRange={dateTimeRange}
        paddingX={paddingX}
        childrenDimensions={{
          height: TIME_AXIS_HEIGHT,
          marginTop: 8,
        }}
      >
        {(width) => (
          <TimeAxis dateTimeRange={dateTimeRange} xRange={[0, width]} />
        )}
      </HealthSegmentedBar>
    </div>
  )
}
