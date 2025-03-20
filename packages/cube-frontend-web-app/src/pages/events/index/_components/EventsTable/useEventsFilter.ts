import { useContext } from 'react'
import { useSearchParams } from 'react-router'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import {
  EventsApiGetEventFilterConditionsRequest,
  GetEventFilterConditionResponseData,
} from '@cube-frontend/api'
import { EventsFilterTableContext } from './context'

export type UseEventsFilter = {
  eventsFilter: GetEventFilterConditionResponseData | undefined
  isEventsFilterLoading: boolean
  handleFilterChange: (updates: Record<string, string | null>) => void
  handleFilterReset: () => void
}

export const useEventsFilter = (): UseEventsFilter => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { eventsType } = useContext(EventsFilterTableContext)

  const [searchParams, setSearchParams] = useSearchParams()

  const { setFilter, resetFilter } = useEventsFilterStore()

  const { data, isLoading } = useCosGetRequest(
    eventsApi.getEventFilterConditions,
    () => {
      return {
        dataCenter: dataCenter,
      } satisfies EventsApiGetEventFilterConditionsRequest
    },
  )

  const handleFilterChange = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      setFilter(eventsType, key, value ?? '')
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    setSearchParams(newParams)
  }

  const handleFilterReset = () => {
    resetFilter(eventsType)

    const newParams = new URLSearchParams()
    newParams.set('eventType', eventsType)
    setSearchParams(newParams)
  }

  return {
    eventsFilter: data,
    isEventsFilterLoading: isLoading,
    handleFilterChange,
    handleFilterReset,
  }
}
