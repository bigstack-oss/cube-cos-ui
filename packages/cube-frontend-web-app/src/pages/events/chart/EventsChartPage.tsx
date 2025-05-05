import { EventsContentSwitcher } from '@cube-frontend/web-app/components/EventsContentSwitcher/EventsContentSwitcher'
import { useEventsFilter } from '@cube-frontend/web-app/hooks/events/useEventsFilter'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { useEventsChartQuery } from './_components/useEventsChartQuery'
import { EventsChartProportion } from './_components/EventsChartProportion/EventsChartProportion'
import { EventsChartComparison } from './_components/EventsChartComparison/EventsChartComparison'
import { ChartTimeRanges, chartTimeRanges } from './_components/timeRangeUtils'
import { GetEventsTypeEnum } from '@cube-frontend/api'

export const EventsChartPage = () => {
  const {
    chartQuery,
    onTypeChange,
    onTimeRangeChange: onTimeRangeQueryChange,
    onFieldChange,
    onFieldAllSelect,
    onFieldReset,
  } = useEventsChartQuery()

  const {
    timeRanges,
    timeRange,
    onTimeRangeChange: onTimeRangeDropdownChange,
  } = useTimeRange({
    includes: chartTimeRanges,
    defaultValue: chartQuery.past,
  })

  const { isEventsFilterLoading, eventsFilter } = useEventsFilter(
    chartQuery.type,
  )

  const onTimeRangeChange = (newTimeRange: ChartTimeRanges) => {
    onTimeRangeQueryChange(newTimeRange)
    onTimeRangeDropdownChange(newTimeRange)
  }

  const onEventsTypeChange = (type: GetEventsTypeEnum) => {
    onTypeChange(type)
    onFieldReset('comparisonCategory')
    onFieldReset('comparisonHost')
    onFieldReset('comparisonInstance')
    onFieldReset('comparisonSeverity')
    onFieldReset('proportionCategory')
    onFieldReset('proportionHost')
    onFieldReset('proportionInstance')
    onFieldReset('proportionSeverity')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <EventsContentSwitcher
          activeTab={chartQuery.type}
          onEventsTypeChange={onEventsTypeChange}
        />
        <TimeRangeDropdown
          selectedItem={timeRange}
          timeRanges={timeRanges}
          onChange={onTimeRangeChange}
        />
      </div>
      <EventsChartProportion
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        chartQuery={chartQuery}
        onFieldChange={onFieldChange}
        onFieldAllSelect={onFieldAllSelect}
      />
      <EventsChartComparison
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        chartQuery={chartQuery}
        onFieldChange={onFieldChange}
        onFieldAllSelect={onFieldAllSelect}
      />
    </div>
  )
}
