import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { CosHyperlink } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { TimePoint } from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'
import { capitalize } from 'lodash'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { timePointFns } from './healthAccordionUtils'
import { HealthTimeTrack, timeTrackHeight } from './HealthTimeTrack'
import { ModuleHealthHistory } from './mockHealth'

export type ModuleHealthProps = {
  name: string
  history: ModuleHealthHistory
  timeRange: TimeRange
  now: Dayjs
}

export const ModuleHealth = (props: ModuleHealthProps) => {
  const { name, history, timeRange, now } = props

  const detailPageLink = useMemo<string>(() => `/home/health/${name}`, [name])

  const timePoints = useMemo<TimePoint[]>(
    () => timePointFns[timeRange](now),
    [timeRange, now],
  )

  return (
    <div className="border-t border-t-functional-border-divider px-12 py-7 pb-3">
      <Link to={detailPageLink}>
        <CosHyperlink
          className="text-functional-text"
          variant="icon-right"
          Icon={ChevronRight}
        >
          {capitalize(name)}
        </CosHyperlink>
      </Link>
      <HealthSegmentedBar
        className="mt-4"
        // TODO: Replace mock data with real API data.
        history={history as GetModuleHealthHistoryResponseDataHistoryInner[]}
        timePoints={timePoints}
        childrenDimensions={{
          height: timeTrackHeight,
          marginTop: 4,
        }}
      >
        {(barWidth) => (
          <HealthTimeTrack width={barWidth} timePoints={timePoints} />
        )}
      </HealthSegmentedBar>
    </div>
  )
}
