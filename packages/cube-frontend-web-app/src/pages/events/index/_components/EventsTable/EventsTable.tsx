import { EventsContentSwitcher } from './EventsContentSwitcher'
import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { EventsRefreshButton } from './EventsRefreshButton'
import { useEvents } from './useEvents'
import { useEventsQuery } from './useEventsQuery'

export const EventsTable = () => {
  const { eventsType, handleEventsTypeChange } = useEventsQuery()

  const {
    events,
    isEventsLoading,
    pagination,
    getResource: onEventsRefresh,
    currentQuery,
    currentPageNum,
    currentPageSize,
    setCurrentPageNum,
    setCurrentPageSize,
  } = useEvents({
    eventsType,
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
      <EventsTableFilter eventsType={eventsType} currentQuery={currentQuery} />
      <EventsTableSelection
        currentPage={currentPageNum}
        setCurrentPage={setCurrentPageNum}
        itemsPerPage={currentPageSize}
        setItemsPerPage={setCurrentPageSize}
        events={events}
        pagination={pagination}
        isEventsLoading={isEventsLoading}
      />
    </div>
  )
}
