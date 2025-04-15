import { EventsContentSwitcher } from '@cube-frontend/web-app/components/EventsContentSwitcher/EventsContentSwitcher'
import { useEventsFilter } from '@cube-frontend/web-app/hooks/events/useEventsFilter'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import {
  timeRanges,
  TimeRange,
  timeRangeLabels,
  timeRangePastMap,
} from './_components/eventsTimeRangeUtils'
import { useEventsChartQuery } from './_components/useEventsChartQuery'
import { EventsChartProportion } from './_components/EventsChartProportion/EventsChartProportion'
import { EventsChartComparison } from './_components/EventsChartComparison/EventsChartComparison'

export const EventsChartPage = () => {
  const {
    eventsType,
    handleEventsTypeChange,
    handleEventsQueryChange,
    getCurrentQuery,
    getRedirectQuery,
  } = useEventsChartQuery()

  const { timeRange, onTimeRangeChange, past } = useTimeRange({
    defaultValue: 'last24Hours' as TimeRange,
    timeRangePastMap,
  })

  const { isEventsFilterLoading, getEventsFilter } = useEventsFilter()

  const eventsFilter = getEventsFilter(eventsType)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <EventsContentSwitcher
          activeTab={eventsType}
          onEventsTypeChange={handleEventsTypeChange}
        />
        <TimeRangeDropdown
          selectedItem={timeRange}
          disabled={false}
          onChange={onTimeRangeChange}
          timeRanges={timeRanges}
          timeRangeLabels={timeRangeLabels}
        />
      </div>
      <EventsChartProportion
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        eventsType={eventsType}
        handleEventsQueryChange={handleEventsQueryChange}
        currentQuery={getCurrentQuery('proportion').eventsFilter}
        getRedirectQuery={getRedirectQuery}
        past={past}
      />
      <EventsChartComparison
        isEventsFilterLoading={isEventsFilterLoading}
        eventsFilter={eventsFilter}
        eventsType={eventsType}
        handleEventsQueryChange={handleEventsQueryChange}
        currentQuery={getCurrentQuery('comparison').eventsFilter}
        getRedirectQuery={getRedirectQuery}
        past={past}
      />
    </div>
  )
}
