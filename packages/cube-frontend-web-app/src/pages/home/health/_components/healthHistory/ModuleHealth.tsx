import {
  GetHealthHistoryModuleTypeEnum,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
} from '@cube-frontend/api'
import { CosHyperlink } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { TimePoint } from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { Dayjs } from 'dayjs'
import { noop } from 'lodash'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { moduleNameToLabel } from '../../homeHealthPageUtils'
import { timePointFns } from './healthHistoryUtils'
import { HealthBarSkeleton } from './HealthBarSkeleton'
import { HealthTimeTrack, timeTrackHeight } from './HealthTimeTrack'
import { HealthTimeRange } from '../../healthTimeRangeUtils'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { dateTimeRangeFns } from '../../[module]/healthDetailsUtils'
import { useTranslation } from 'react-i18next'

export type ModuleHealthProps = {
  moduleName: GetHealthHistoryModuleTypeEnum
  isLoading: boolean
  history: GetServiceHealthHistoryResponseDataInnerHistoryInner[]
  timeRange: HealthTimeRange
  now: Dayjs
}

export const ModuleHealth = (props: ModuleHealthProps) => {
  const { moduleName, isLoading, history, timeRange, now } = props

  const detailPageLink = useMemo<string>(
    () => CosRoutesEnum.HOME_HEALTH_DETAIL_PAGE(moduleName),
    [moduleName],
  )

  const { t } = useTranslation()

  const timePoints = useMemo<TimePoint[]>(
    () => timePointFns[timeRange](now, t('page.health.now')),
    [timeRange, now, t],
  )

  const dateTimeRange = useMemo(
    () => dateTimeRangeFns[timeRange](now),
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
          {moduleNameToLabel(moduleName)}
        </CosHyperlink>
      </Link>
      {isLoading ? (
        <HealthBarSkeleton />
      ) : (
        <HealthSegmentedBar
          className="mt-4"
          history={history}
          dateTimeRange={dateTimeRange}
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
