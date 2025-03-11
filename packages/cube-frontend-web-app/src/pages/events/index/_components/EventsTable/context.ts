import { GetEventsTypeEnum } from '@cube-frontend/api'
import { createContext } from 'react'

export type EventsFilterTableContextValue = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (type: GetEventsTypeEnum) => void
}

export const EventsFilterTableContext =
  createContext<EventsFilterTableContextValue>({
    eventsType: GetEventsTypeEnum.System,
    handleEventsTypeChange: () => {},
  })
