import {
  GetHealthHistoryPastEnum,
  GetModuleHealthHistoryResponseData,
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

type UseModuleHealthHistory = {
  historyResponse: GetModuleHealthHistoryResponseData | undefined
  getHealthHistory: () => Promise<GetModuleHealthHistoryResponseData>
  startInterval: () => void
  stopInterval: () => void
}

export const useModuleHealthHistory = (
  options: UseModuleHealthHistoryOptions,
): UseModuleHealthHistory => {
  const { module, past, autoRefresh: shouldUsePollingData } = options

  const { dataCenter } = useContext(DataCenterContext)

  const getRequestParams = (): HealthApiGetHealthHistoryRequest | undefined => {
    if (!module) {
      return undefined
    }
    return {
      dataCenter: dataCenter!.name,
      serviceType: module.service,
      moduleType: module.name,
      past,
    }
  }

  const { data: pollingResponse, getResource: getHealthHistoryByPolling } =
    useCosGetRequest(
      healthApi.getHealthHistory,
      (): HealthApiGetHealthHistoryRequest | undefined => {
        if (!shouldUsePollingData) {
          return undefined
        }
        return getRequestParams()
      },
    )

  const { startInterval, stopInterval } = useSequentialInterval(
    () => {
      if (module && shouldUsePollingData) {
        getHealthHistoryByPolling()
      }
    },
    HOME_HEALTH_PAGE_POLLING_INTERVAL,
    {
      immediate: false,
    },
  )

  const {
    data: manualFetchResponse,
    getResource: getHealthHistoryByManualFetch,
  } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (shouldUsePollingData) {
        return undefined
      }
      return getRequestParams()
    },
  )

  // Use stream data if `autoFetch` is true. Otherwise, use manual fetch data.
  const historyResponse = shouldUsePollingData
    ? pollingResponse
    : manualFetchResponse

  return {
    historyResponse,
    getHealthHistory: shouldUsePollingData
      ? getHealthHistoryByPolling
      : getHealthHistoryByManualFetch,
    startInterval,
    stopInterval,
  }
}
