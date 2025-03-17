import { EventsContentSwitcher } from '@cube-frontend/web-app/components/EventsContentSwitcher/EventsContentSwitcher'
import { useEventsFilter } from '@cube-frontend/web-app/hooks/events/useEventsFilter'
import { useEventsChartQuery } from './_components/useEventsChartQuery'
import { EventsChartProportion } from './_components/EventsChartProportion/EventsChartProportion'
import { EventsChartComparison } from './_components/EventsChartComparison/EventsChartComparison'
import { TimeRangeDropdown } from './_components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from './_components/TimeRangeDropdown/useTimeRange'

export const EventsChartPage = () => {
  const {
    eventsType,
    handleEventsTypeChange,
    handleEventsQueryChange,
    getCurrentQuery,
    getRedirectQuery,
  } = useEventsChartQuery()

  const { timeRange, onTimeRangeChange, past } = useTimeRange()

  const { isEventsFilterLoading, getEventsFilter } = useEventsFilter()

  const eventsFilter = getEventsFilter(eventsType)

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <EventsContentSwitcher
          activeTab={eventsType}
          onEventsTypeChange={handleEventsTypeChange}
        />
        <TimeRangeDropdown
          selectedItem={timeRange}
          disabled={false}
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
