import { createContext } from 'react'
import { GetEventsTypeEnum } from '@cube-frontend/api'

export type EventsFilterTableContextValue = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (type: GetEventsTypeEnum) => void
}

export const EventsFilterTableContext =
  createContext<EventsFilterTableContextValue>({
    eventsType: GetEventsTypeEnum.System,
    handleEventsTypeChange: () => {},
  })
