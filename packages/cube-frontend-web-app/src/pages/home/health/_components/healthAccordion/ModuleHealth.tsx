import {
  GetHealthHistoryModuleTypeEnum,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
} from '@cube-frontend/api'
import { CosHyperlink } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { TimePoint } from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'
import { capitalize, noop } from 'lodash'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { timePointFns } from './healthAccordionUtils'
import { HealthBarSkeleton } from './HealthBarSkeleton'
import { HealthTimeTrack, timeTrackHeight } from './HealthTimeTrack'

export type ModuleHealthProps = {
  moduleName: GetHealthHistoryModuleTypeEnum
  isLoading: boolean
  history: GetServiceHealthHistoryResponseDataInnerHistoryInner[]
  timeRange: TimeRange
  now: Dayjs
}

export const ModuleHealth = (props: ModuleHealthProps) => {
  const { moduleName, isLoading, history, timeRange, now } = props

  const detailPageLink = useMemo<string>(
    () => `/home/health/${moduleName}`,
    [moduleName],
  )

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
          // Assign noop because `CosHyperlink` requires either `href` or `onClick` prop to be presented.
          onClick={noop}
        >
          {capitalize(moduleName)}
        </CosHyperlink>
      </Link>
      {isLoading ? (
        <HealthBarSkeleton />
      ) : (
        <HealthSegmentedBar
          className="mt-4"
          history={history}
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
      )}
    </div>
  )
}
