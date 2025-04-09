import {
  GetHealthHistoryPastEnum,
  GetModuleHealthHistoryResponseDataHistoryInner,
  HealthApiGetHealthHistoryRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useContext } from 'react'
import { HOME_HEALTH_PAGE_POLLING_INTERVAL } from '../homeHealthPageUtils'

export type UseModuleHealthHistoryOptions = {
  module: ModuleMetadata | undefined
  past: GetHealthHistoryPastEnum
  autoRefresh: boolean
}

export const useModuleHealthHistory = (
  options: UseModuleHealthHistoryOptions,
): GetModuleHealthHistoryResponseDataHistoryInner[] | undefined => {
  const { module, past, autoRefresh: shouldUseStreamData } = options

  const { name: dataCenter } = useContext(DataCenterContext)

  const getRequestParams = (): HealthApiGetHealthHistoryRequest | undefined => {
    if (!module) {
      return undefined
    }
    return {
      dataCenter,
      serviceType: module.service,
      moduleType: module.name,
      past,
    }
  }

  const { data: streamResponse, getResource: getHealthHistory } =
    useCosGetRequest(
      healthApi.getHealthHistory,
      (): HealthApiGetHealthHistoryRequest | undefined => {
        if (!shouldUseStreamData) {
          return undefined
        }
        return getRequestParams()
      },
    )

  useSequentialInterval(
    () => {
      if (module && shouldUseStreamData) {
        getHealthHistory()
      }
    },
    HOME_HEALTH_PAGE_POLLING_INTERVAL,
    {
      immediate: false,
    },
  )

  const { data: manualFetchResponse } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (shouldUseStreamData) {
        return undefined
      }
      return getRequestParams()
    },
  )

  // Use stream data if `autoFetch` is true. Otherwise, use manual fetch data.
  const response = shouldUseStreamData ? streamResponse : manualFetchResponse

  return response?.history
}
