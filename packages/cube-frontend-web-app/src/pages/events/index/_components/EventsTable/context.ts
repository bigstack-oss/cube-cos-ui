import { createContext } from 'react'
import {
  GetEventsResponseData,
  GetEventsResponseDataEventsInner,
  GetEventsTypeEnum,
  Page,
} from '@cube-frontend/api'

export type ItemsPerPage = 10 | 20 | 30 | 50 | 100

export type EventsFilterTableContextValue = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (type: GetEventsTypeEnum) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: ItemsPerPage
  setItemsPerPage: React.Dispatch<React.SetStateAction<ItemsPerPage>>
  events: GetEventsResponseDataEventsInner[] | undefined
  isEventsLoading: boolean
  pagination: Page | undefined
  onEventsMutate: (() => Promise<GetEventsResponseData>) | undefined
}

export const EventsFilterTableContext =
  createContext<EventsFilterTableContextValue>({
    eventsType: GetEventsTypeEnum.System,
    handleEventsTypeChange: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    itemsPerPage: 10,
    setItemsPerPage: () => {},
    events: undefined,
    isEventsLoading: false,
    pagination: undefined,
    onEventsMutate: undefined,
  })
