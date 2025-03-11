import {
  GetHealthHistoryPastEnum,
  GetModuleHealthHistoryResponseDataHistoryInner,
  HealthApiGetHealthHistoryRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useContext } from 'react'

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

  const { data: streamResponse } = useCosStreamRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (!shouldUseStreamData) {
        return undefined
      }
      return getRequestParams()
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

  // Use stream data is `autoFetch` is true. Otherwise, use manual fetch data.
  const response = shouldUseStreamData ? streamResponse : manualFetchResponse

  return response?.history
}
