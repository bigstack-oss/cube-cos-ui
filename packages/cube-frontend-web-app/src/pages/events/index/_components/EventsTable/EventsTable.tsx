import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { EventsContentSwitcher } from './EventsContentSwitcher'
import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { EventsFilterTableContext } from './context'

export const EventsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [eventsType, setEventsType] = useState<GetEventsTypeEnum>(
    (searchParams.get('eventType') as GetEventsTypeEnum) ??
      GetEventsTypeEnum.System,
  )

  const { getFilters } = useEventsFilterStore()

  useEffect(() => {
    const storedFilters = getFilters(eventsType)
    const newParams = new URLSearchParams()

    newParams.set('eventType', eventsType)

    Object.entries(storedFilters).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
    })

    setSearchParams(newParams)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsType])

  const handleEventsTypeChange = (tab: GetEventsTypeEnum) => {
    const newParams = new URLSearchParams()
    newParams.set('eventType', tab)
    setSearchParams(newParams)
    setEventsType(tab)
  }

  return (
    <div className="flex flex-col gap-6 bg-white px-6 py-4">
      <div>
        <h5 className="secondary-h5">Event Filter Table</h5>
      </div>
      <EventsFilterTableContext.Provider
        value={{ eventsType, handleEventsTypeChange }}
      >
        <EventsContentSwitcher />
        <EventsTableFilter />
        <EventsTableSelection />
      </EventsFilterTableContext.Provider>
    </div>
  )
}
