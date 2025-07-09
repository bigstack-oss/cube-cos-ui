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
  aggregatedHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  rawHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  getHealthHistory: () => Promise<{
    aggregated: GetModuleHealthHistoryResponseData
    raw: GetModuleHealthHistoryResponseData
  }>
  startInterval: () => void
  stopInterval: () => void
}

export const useModuleHealthHistory = (
  options: UseModuleHealthHistoryOptions,
): UseModuleHealthHistory => {
  const { module, past, autoRefresh: shouldUsePollingData } = options

  const { dataCenter } = useContext(DataCenterContext)

  const getRequestParams = (
    aggregate: boolean,
  ): HealthApiGetHealthHistoryRequest | undefined => {
    if (!module) {
      return undefined
    }
    return {
      dataCenter: dataCenter!.name,
      serviceType: module.service,
      moduleType: module.name,
      past,
      aggregate,
    }
  }

  const {
    data: pollingAggregatedResponse,
    getResource: getAggregatedHealthHistoryByPolling,
  } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (!shouldUsePollingData) {
        return undefined
      }
      return getRequestParams(true)
    },
  )

  const {
    data: pollingRawResponse,
    getResource: getRawHealthHistoryByPolling,
  } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (!shouldUsePollingData) {
        return undefined
      }
      return getRequestParams(false)
    },
  )

  const { startInterval, stopInterval } = useSequentialInterval(
    () => {
      if (module && shouldUsePollingData) {
        getAggregatedHealthHistoryByPolling()
        getRawHealthHistoryByPolling()
      }
    },
    HOME_HEALTH_PAGE_POLLING_INTERVAL,
    {
      immediate: false,
    },
  )

  const {
    data: manualFetchAggregatedResponse,
    getResource: getAggregatedHealthHistoryByManualFetch,
  } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (shouldUsePollingData) {
        return undefined
      }
      return getRequestParams(true)
    },
  )

  const {
    data: manualFetchRawResponse,
    getResource: getRawHealthHistoryByManualFetch,
  } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (shouldUsePollingData) {
        return undefined
      }
      return getRequestParams(false)
    },
  )

  // Use stream data if `autoFetch` is true. Otherwise, use manual fetch data.
  const aggregatedHistoryResponse = shouldUsePollingData
    ? pollingAggregatedResponse
    : manualFetchAggregatedResponse

  const rawHistoryResponse = shouldUsePollingData
    ? pollingRawResponse
    : manualFetchRawResponse

  const getHealthHistory = async () => {
    if (shouldUsePollingData) {
      const [aggregated, raw] = await Promise.all([
        getAggregatedHealthHistoryByPolling(),
        getRawHealthHistoryByPolling(),
      ])

      return { aggregated, raw }
    }
    const [aggregated, raw] = await Promise.all([
      getAggregatedHealthHistoryByManualFetch(),
      getRawHealthHistoryByManualFetch(),
    ])

    return { aggregated, raw }
  }

  return {
    aggregatedHistoryResponse,
    rawHistoryResponse,
    getHealthHistory,
    startInterval,
    stopInterval,
  }
}
