import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { EventsRefreshButton } from './EventsRefreshButton'
import { useEvents } from './useEvents'
import { useEventsQuery } from './useEventsQuery'

export const EventsTable = () => {
  const {
    eventsQuery,
    onTypeChange,
    onKeywordChange,
    onDatesChange,
    onFieldChange,
    onPageNumChange,
    onPageSizeChange,
  } = useEventsQuery()

  const {
    events,
    isEventsLoading,
    getResource: onEventsRefresh,
    totalItems,
  } = useEvents(eventsQuery)

  return (
    <div className="flex flex-col gap-6 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h5 className="secondary-h5">Events</h5>
        <EventsRefreshButton
          onEventsRefresh={onEventsRefresh}
          isEventsLoading={isEventsLoading}
        />
      </div>
      <EventsTableFilter
        eventsQuery={eventsQuery}
        onTypeChange={onTypeChange}
        onKeywordChange={onKeywordChange}
        onDatesChange={onDatesChange}
        onFieldChange={onFieldChange}
      />
      <EventsTableSelection
        isEventsLoading={isEventsLoading}
        events={events}
        currentPage={eventsQuery.pageNum}
        itemsPerPage={eventsQuery.pageSize}
        totalItems={totalItems}
        onPageNumChange={onPageNumChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
