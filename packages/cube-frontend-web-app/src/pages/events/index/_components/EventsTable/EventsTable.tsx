import { EventsContentSwitcher } from './EventsContentSwitcher'
import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { EventsRefreshButton } from './EventsRefreshButton'
import { useEvents } from './useEvents'
import { useEventsQuery } from './useEventsQuery'

export const EventsTable = () => {
  const {
    eventsType,
    handleEventsTypeChange,
    handleEventsQueryChange,
    handleEventsQueryReset,
    handleCurrentPageChange,
    handlePageSizeChange,
    getCurrentQuery,
  } = useEventsQuery()

  const {
    events,
    isEventsLoading,

    getResource: onEventsRefresh,
    currentQuery,
    currentPage,
    itemsPerPage,
    totalItems,
  } = useEvents({
    eventsType,
    getCurrentQuery,
  })

  return (
    <div className="flex flex-col gap-6 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h5 className="secondary-h5">Events</h5>
        <EventsRefreshButton
          onEventsRefresh={onEventsRefresh}
          isEventsLoading={isEventsLoading}
        />
      </div>
      <EventsContentSwitcher
        activeTab={eventsType}
        onEventsTypeChange={handleEventsTypeChange}
      />
      <EventsTableFilter
        eventsType={eventsType}
        currentQuery={currentQuery}
        handleEventsQueryChange={handleEventsQueryChange}
        handleEventsQueryReset={handleEventsQueryReset}
      />
      <EventsTableSelection
        isEventsLoading={isEventsLoading}
        events={events}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        handleCurrentPageChange={handleCurrentPageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
