import { CosSearchBarFilter } from '@cube-frontend/ui-library'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import Cancel from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { FilterDropdown } from './FilterDropdown'
import { FilterDatePicker } from './FilterDatePicker'
import { useEventsFilter } from './useEventsFilter'
import { useEventsQuery } from './useEventsQuery'
import { mapFilterToFilterKey } from './utils'

type EventsTableFilterProps = {
  eventsType: GetEventsTypeEnum
  currentQuery: {
    eventsFilter: Record<string, string>
    isEventsFilterEmpty: boolean
  }
}

export const EventsTableFilter = (props: EventsTableFilterProps) => {
  const { eventsType, currentQuery } = props

  const { isLoading: isEventsFilterLoading, getEventsFilter } =
    useEventsFilter()

  const eventsFilter = getEventsFilter(eventsType)

  const { handleEventsQueryChange, handleEventsQueryReset } = useEventsQuery()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <CosSearchBarFilter
          isLoading={isEventsFilterLoading}
          value={currentQuery.eventsFilter.keyword || ''}
          onChange={(e) => handleEventsQueryChange({ keyword: e.target.value })}
          onInputClear={() => handleEventsQueryChange({ keyword: null })}
          showDropdown={false}
        />
      </div>
      {eventsFilter &&
        Object.entries(eventsFilter).map(([key, options]) => {
          const filterKey = mapFilterToFilterKey(key)
          return (
            <FilterDropdown
              key={key}
              isLoading={isEventsFilterLoading}
              filterKey={filterKey}
              options={options}
              selectedValue={currentQuery.eventsFilter?.[filterKey]}
              onChange={handleEventsQueryChange}
            />
          )
        })}
      <FilterDatePicker
        isLoading={isEventsFilterLoading}
        selectedStartDate={currentQuery.eventsFilter.startDate}
        selectedEndDate={currentQuery.eventsFilter.endDate}
        onChange={handleEventsQueryChange}
      />
      {!currentQuery.isEventsFilterEmpty && (
        <>
          <div className="h-[34px] border-l border-functional-border-divider"></div>
          <Cancel
            className="icon-md m-[10px] shrink-0 cursor-pointer text-functional-text-light"
            onClick={handleEventsQueryReset}
          />
        </>
      )}
    </div>
  )
}
