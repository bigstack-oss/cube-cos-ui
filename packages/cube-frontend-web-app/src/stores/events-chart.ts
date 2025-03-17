import { create } from 'zustand'

type EventsChartFilterState = {
  filters: Record<string, Record<string, string>>
  setFilter: (tab: string, key: string, value: string) => void
  resetFilter: (tab: string) => void
  getFilters: (tab: string) => Record<string, string>
}

export const useEventsChartFilterStore = create<EventsChartFilterState>(
  (set, get) => ({
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
    resetFilter: (tab) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [tab]: {},
        },
      })),
    getFilters: (tab) => get().filters[tab] || {},
  }),
)
