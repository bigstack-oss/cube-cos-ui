import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'
import { EventsContentSwitcher } from './EventsContentSwitcher'
import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { EventsRefreshButton } from './EventsRefreshButton'
import { useEvents } from './useEvents'

export const EventsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  )

  const { eventsType, setEventsType, getEventsFilter } = useEventsFilterStore()

  const { events, isEventsLoading, pagination, onEventsMutate } = useEvents({
    eventsType,
    pageSize: itemsPerPage,
    pageNum: currentPage,
  })

  useEffect(() => {
    const storedFilters = getEventsFilter()
    const newParams = new URLSearchParams()

    newParams.set('eventType', eventsType)

    Object.entries(storedFilters).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
    })

    setSearchParams(newParams)

    /**
     * `searchParams` is included in the dependency array to make sure -
     * this effect runs whenever the query parameters change.
     */
  }, [eventsType, getEventsFilter, searchParams, setSearchParams])

  const handleEventsTypeChange = (tab: GetEventsTypeEnum) => {
    const newParams = new URLSearchParams()
    newParams.set('eventType', tab)
    setSearchParams(newParams)
    setEventsType(tab)
  }

  return (
    <div className="flex flex-col gap-6 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h5 className="secondary-h5">Events</h5>
        <EventsRefreshButton
          onEventsMutate={onEventsMutate}
          isEventsLoading={isEventsLoading}
        />
      </div>
      <EventsContentSwitcher onEventsTypeChange={handleEventsTypeChange} />
      <EventsTableFilter />
      <EventsTableSelection
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        events={events}
        pagination={pagination}
        isEventsLoading={isEventsLoading}
      />
    </div>
  )
}
