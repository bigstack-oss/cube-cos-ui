import { create } from 'zustand'
import { GetEventsTypeEnum } from '@cube-frontend/api'

type EventsFilterState = {
  eventsType: GetEventsTypeEnum
  eventsFilters: Record<GetEventsTypeEnum, Record<string, string>>
  setEventsType: (type: GetEventsTypeEnum) => void
  setEventsFilter: (key: string, value: string) => void
  clearEventsFilter: (key: string) => void
  resetEventsFilter: () => void
  getEventsFilter: () => Record<string, string>
  isCurrentFilterEmpty: boolean
}

export const useEventsFilterStore = create<EventsFilterState>((set, get) => ({
  eventsType: GetEventsTypeEnum.System,
  eventsFilters: {
    [GetEventsTypeEnum.System]: {},
    [GetEventsTypeEnum.Host]: {},
    [GetEventsTypeEnum.Instance]: {},
  },
  setEventsType: (type) => set({ eventsType: type }),
  setEventsFilter: (key, value) =>
    set((state) => {
      const updatedFilters = {
        ...state.eventsFilters,
        [state.eventsType]: {
          ...state.eventsFilters[state.eventsType],
          [key]: value,
        },
      }
      return {
        eventsFilters: updatedFilters,
        isCurrentFilterEmpty:
          Object.keys(updatedFilters[state.eventsType]).length === 0,
      }
    }),
  clearEventsFilter: (key) =>
    set((state) => {
      const newFilters = { ...state.eventsFilters[state.eventsType] }
      delete newFilters[key]
      return {
        eventsFilters: {
          ...state.eventsFilters,
          [state.eventsType]: newFilters,
        },
        isCurrentFilterEmpty: Object.keys(newFilters).length === 0,
      }
    }),
  resetEventsFilter: () =>
    set((state) => {
      const updatedFilters = {
        ...state.eventsFilters,
        [state.eventsType]: {},
      }
      return {
        eventsFilters: updatedFilters,
        isCurrentFilterEmpty: true,
      }
    }),
  getEventsFilter: () => get().eventsFilters[get().eventsType] || {},
  isCurrentFilterEmpty: true,
}))
