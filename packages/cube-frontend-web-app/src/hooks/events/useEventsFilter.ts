import { useContext } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import {
  EventsApiGetEventFilterConditionsRequest,
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
  GetEventsTypeEnum,
} from '@cube-frontend/api'

export type UseEventsFilter = {
  isEventsFilterLoading: boolean
  eventsFilter:
    | GetEventFilterConditionResponseDataSystem
    | GetEventFilterConditionResponseDataHost
    | GetEventFilterConditionResponseDataInstance
    | undefined
}

export const useEventsFilter = (type: GetEventsTypeEnum): UseEventsFilter => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    eventsApi.getEventFilterConditions,
    () => {
      return {
        dataCenter: dataCenter!.name,
      } satisfies EventsApiGetEventFilterConditionsRequest
    },
  )

  return {
    isEventsFilterLoading: isLoading,
    eventsFilter: data?.[type],
  }
}
