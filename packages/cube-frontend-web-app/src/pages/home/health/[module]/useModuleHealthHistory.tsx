import {
  GetHealthHistoryPastEnum,
  GetModuleHealthHistoryResponseData,
  HealthApiGetHealthHistoryRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useContext } from 'react'
import { HOME_HEALTH_PAGE_POLLING_INTERVAL } from '../homeHealthPageUtils'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'

export type UseModuleHealthHistoryOptions = {
  module: ModuleMetadata | undefined
  past: GetHealthHistoryPastEnum
  autoRefresh: boolean
}

type UseModuleHealthHistory = {
  showAggregatedHistoryLoading: boolean
  aggregatedHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  showRawHistoryLoading: boolean
  rawHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  getHealthHistory: () => Promise<{
    aggregated: GetModuleHealthHistoryResponseData
    raw: GetModuleHealthHistoryResponseData
  }>
  startPolling: () => void
  stopPolling: () => void
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
    isLoading: isPollingAggregatedLoading,
    hasResponseBeenReceived: hasPollingAggregatedResponseBeenReceived,
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
    isLoading: isPollingRawLoading,
    hasResponseBeenReceived: hasPollingRawResponseBeenReceived,
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

  const { isPolling, startPolling, stopPolling } = usePolling(async () => {
    if (module && shouldUsePollingData) {
      await Promise.all([
        getAggregatedHealthHistoryByPolling(),
        getRawHealthHistoryByPolling(),
      ])
    }
  }, HOME_HEALTH_PAGE_POLLING_INTERVAL)

  const {
    data: manualFetchAggregatedResponse,
    isLoading: isManualFetchAggregatedLoading,
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
    isLoading: isManualFetchRawLoading,
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

  const showAggregatedHistoryLoading = shouldUsePollingData
    ? shouldDisplayLoading({
        isPolling,
        isLoading: isPollingAggregatedLoading,
        hasResponseBeenReceived: hasPollingAggregatedResponseBeenReceived,
      })
    : isManualFetchAggregatedLoading

  // Use stream data if `autoFetch` is true. Otherwise, use manual fetch data.
  const aggregatedHistoryResponse = shouldUsePollingData
    ? pollingAggregatedResponse
    : manualFetchAggregatedResponse

  const showRawHistoryLoading = shouldUsePollingData
    ? shouldDisplayLoading({
        isPolling,
        isLoading: isPollingRawLoading,
        hasResponseBeenReceived: hasPollingRawResponseBeenReceived,
      })
    : isManualFetchRawLoading

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
    showAggregatedHistoryLoading,
    aggregatedHistoryResponse,
    showRawHistoryLoading,
    rawHistoryResponse,
    getHealthHistory,
    startPolling,
    stopPolling,
  }
}
