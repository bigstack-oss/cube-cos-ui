import { useMemo } from 'react'
import { range } from 'lodash'
import { pipe } from 'lodash/fp'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { useServices } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { healthTimeRanges } from '../../healthTimeRangeUtils'
import { CategoryHealthPanelSkeleton } from './CategoryHealthPanelSkeleton'
import {
  groupServicesByCategory,
  ServiceCategory,
  sortCategoryServicesByModuleCount,
} from './healthHistoryUtils'
import { CategoryHealthPanel } from './CategoryHealthPanel'

export const HealthHistory = () => {
  const { now, timeRange, onTimeRangeChange } = useTimeRange({
    includes: healthTimeRanges,
    defaultValue: '24h',
  })

  const { services, isLoadingServices } = useServices()

  const categories = useMemo<ServiceCategory[]>(
    () =>
      pipe(
        groupServicesByCategory,
        sortCategoryServicesByModuleCount,
      )(services),
    [services],
  )

  return (
    <div className="mt-[26px] flex flex-col gap-y-3">
      <div className="flex items-center justify-end">
        <TimeRangeDropdown
          selectedItem={timeRange}
          disabled={isLoadingServices}
          onChange={onTimeRangeChange}
          timeRanges={healthTimeRanges}
        />
      </div>
      {isLoadingServices
        ? range(0, 3).map((index) => (
            <CategoryHealthPanelSkeleton key={index} />
          ))
        : categories.map((category) => (
            <CategoryHealthPanel
              key={category.name}
              category={category}
              timeRange={timeRange}
              now={now}
              past={timeRange}
            />
          ))}
    </div>
  )
}
