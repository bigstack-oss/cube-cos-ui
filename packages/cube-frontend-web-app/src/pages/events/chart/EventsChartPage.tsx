import { EventsContentSwitcher } from '@cube-frontend/web-app/components/EventsContentSwitcher/EventsContentSwitcher'
import { useEventsFilter } from '@cube-frontend/web-app/hooks/events/useEventsFilter'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { useEventsChartQuery } from './_components/useEventsChartQuery'
import { EventsChartProportion } from './_components/EventsChartProportion/EventsChartProportion'
import { EventsChartComparison } from './_components/EventsChartComparison/EventsChartComparison'
import { ChartTimeRanges, chartTimeRanges } from './_components/utils'

export const EventsChartPage = () => {
  const {
    past,
    eventsType,
    handleEventsTypeChange,
    handleTimeRangeChange: onTimeRangeQueryChange,
    handleEventsQueryChange,
    getCurrentQuery,
    getRedirectQuery,
  } = useEventsChartQuery()

  const {
    timeRanges,
    timeRange,
    onTimeRangeChange: onTimeRangeDropdownChange,
  } = useTimeRange({
    includes: chartTimeRanges,
    defaultValue: past,
  })

  const { isEventsFilterLoading, getEventsFilter } = useEventsFilter()

  const eventsFilter = getEventsFilter(eventsType)

  const onTimeRangeChange = (newTimeRange: ChartTimeRanges) => {
    onTimeRangeQueryChange(newTimeRange)
    onTimeRangeDropdownChange(newTimeRange)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <EventsContentSwitcher
          activeTab={eventsType}
          onEventsTypeChange={handleEventsTypeChange}
        />
        <TimeRangeDropdown
          disabled={false}
          selectedItem={timeRange}
          timeRanges={timeRanges}
          onChange={onTimeRangeChange}
        />
      </div>
      <EventsChartProportion
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        eventsType={eventsType}
        handleEventsQueryChange={handleEventsQueryChange}
        currentQuery={getCurrentQuery('proportion').eventsFilter}
        getRedirectQuery={getRedirectQuery}
        past={timeRange}
      />
      <EventsChartComparison
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        eventsType={eventsType}
        handleEventsQueryChange={handleEventsQueryChange}
        currentQuery={getCurrentQuery('comparison').eventsFilter}
        getRedirectQuery={getRedirectQuery}
        past={timeRange}
      />
    </div>
  )
}
