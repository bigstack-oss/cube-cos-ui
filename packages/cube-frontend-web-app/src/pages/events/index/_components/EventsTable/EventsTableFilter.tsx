import { useContext } from 'react'
import { CosSearchBarFilter } from '@cube-frontend/ui-library'
import Cancel from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { FilterDropdown } from './FilterDropdown'
import { FilterDatePicker } from './FilterDatePicker'
import { useEventsFilter } from './useEventsFilter'
import { EventsFilterTableContext } from './context'
import { mapFilterToFilterKey } from './utils'

export const EventsTableFilter = () => {
  const { filters } = useEventsFilterStore()

  const { eventsType } = useContext(EventsFilterTableContext)

  const {
    eventsFilter,
    isEventsFilterLoading,
    handleFilterChange,
    handleFilterReset,
  } = useEventsFilter()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <CosSearchBarFilter
          isLoading={isEventsFilterLoading}
          value={filters[eventsType]?.keyword || ''}
          onChange={(e) => handleFilterChange({ keyword: e.target.value })}
          onInputClear={() => handleFilterChange({ keyword: null })}
          showDropdown={false}
        />
      </div>
      {eventsFilter &&
        eventsFilter[eventsType] &&
        Object.entries(eventsFilter[eventsType]).map(([key, options]) => {
          const filterKey = mapFilterToFilterKey(key)
          return (
            <FilterDropdown
              key={key}
              isLoading={isEventsFilterLoading}
              filterKey={filterKey}
              options={options}
              selectedValue={filters[eventsType][filterKey]}
              onChange={handleFilterChange}
            />
          )
        })}
      <FilterDatePicker
        isLoading={isEventsFilterLoading}
        selectedStartDate={filters[eventsType]?.startDate}
        selectedEndDate={filters[eventsType]?.endDate}
        onChange={handleFilterChange}
      />
      <div className="h-[34px] border-l border-functional-border-divider"></div>
      <Cancel
        className="icon-md m-[10px] shrink-0 cursor-pointer text-functional-text-light"
        onClick={handleFilterReset}
      />
    </div>
  )
}
