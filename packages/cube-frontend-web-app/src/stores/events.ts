import { create } from 'zustand'

type EventsFilterState = {
  filters: Record<string, Record<string, string>>
  setFilter: (tab: string, key: string, value: string) => void
  clearFilter: (tab: string, key: string) => void
  resetFilter: (tab: string) => void
  getFilters: (tab: string) => Record<string, string>
}

export const useEventsFilterStore = create<EventsFilterState>((set, get) => ({
  filters: {
    system: {},
    host: {},
    instance: {},
  },
  setFilter: (tab, key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [tab]: {
          ...state.filters[tab],
          [key]: value,
        },
      },
    })),
  clearFilter: (tab, key) =>
    set((state) => {
      const newFilters = { ...state.filters[tab] }
      delete newFilters[key]
      return {
        filters: {
          ...state.filters,
          [tab]: newFilters,
        },
      }
    }),
  resetFilter: (tab) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [tab]: {},
      },
    })),
  getFilters: (tab) => get().filters[tab] || {},
}))
