import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { TimePoint } from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'
import { useMemo } from 'react'
import { timePointFns } from './healthDetailsUtils'

export type HealthTimeBarProps = {
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined
  now: Dayjs
  selectedTimeRange: TimeRange
}

const TIME_TRACK_HEIGHT = 32

export const HealthTimeBar = (props: HealthTimeBarProps) => {
  const { history, now, selectedTimeRange } = props

  const timePoints = useMemo<TimePoint[]>(
    () => timePointFns[selectedTimeRange](now),
    [selectedTimeRange, now],
  )

  return (
    <HealthSegmentedBar
      isLoading={!history}
      history={history ?? []}
      timePoints={timePoints}
      childrenDimensions={{
        height: TIME_TRACK_HEIGHT,
        marginTop: 8,
      }}
    >
      {(width) => (
        <foreignObject width={width} height={TIME_TRACK_HEIGHT}>
          <div className="flex items-start justify-between border-t border-t-functional-border-divider px-2">
            {timePoints.map((timePoint) => (
              <div
                key={timePoint.timestamp}
                className="flex flex-col items-center gap-y-px"
              >
                <span className="h-1 w-px bg-functional-text" />
                <div className="primary-body6 text-functional-text">
                  {timePoint.labels.map((label) => (
                    <div key={label}>{label}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </foreignObject>
      )}
    </HealthSegmentedBar>
  )
}
