import { useContext } from 'react'
import { useSearchParams } from 'react-router'
import {
  EventsApiGetEventFilterConditionsRequest,
  GetEventsResponseData,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import Cancel from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { CosSearchBarFilter } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { FilterDropdown } from './FilterDropdown'
import { FilterDatePicker } from './FilterDatePicker'
import { getEventsFilterOptions, getFilterKey } from './utils'

type EventsTableFilterProps = {
  eventType: GetEventsTypeEnum
  getResource: () => Promise<GetEventsResponseData>
}

export const EventsTableFilter = (props: EventsTableFilterProps) => {
  const { eventType, getResource: onEventsMutate } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const { filters, setFilter, resetFilter } = useEventsFilterStore()

  const dataCenter = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    eventsApi.getEventFilterConditions,
    () => {
      return {
        dataCenter: dataCenter.name,
      } satisfies EventsApiGetEventFilterConditionsRequest
    },
  )

  const filterOptions = getEventsFilterOptions(eventType, data)

  const handleFilterChange = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      setFilter(eventType, key, value || '')

      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    setSearchParams(newParams)

    onEventsMutate()
  }

  const handleFilterReset = () => {
    resetFilter(eventType)

    const newParams = new URLSearchParams()
    newParams.set('eventType', eventType)
    setSearchParams(newParams)

    onEventsMutate()
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <CosSearchBarFilter
          isLoading={isLoading}
          value={filters[eventType]?.keyword || ''}
          onChange={(e) => handleFilterChange({ keyword: e.target.value })}
          onInputClear={() => handleFilterChange({ keyword: null })}
          showDropdown={false}
        />
        {eventType &&
          Object.entries(filterOptions).map(([key, options]) => {
            const filterKey = getFilterKey(key)
            return (
              <FilterDropdown
                key={key}
                isLoading={isLoading}
                filterKey={filterKey}
                options={options}
                selectedValue={filters[eventType][filterKey]}
                onChange={handleFilterChange}
              />
            )
          })}
        <FilterDatePicker
          isLoading={isLoading}
          selectedStartDate={filters[eventType]?.startDate}
          selectedEndDate={filters[eventType]?.endDate}
          onChange={handleFilterChange}
        />
      </div>
      <div className="h-[34px] border-l border-functional-border-divider"></div>
      <Cancel
        className="icon-md m-[10px] cursor-pointer text-functional-text-light"
        onClick={handleFilterReset}
      />
    </div>
  )
}
