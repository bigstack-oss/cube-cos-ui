import {
  CHART_PAGE_POLLING_INTERVAL,
  getDiskLatencyHistory,
  getDiskLatencyHistoryTypeParams,
} from '../utils'
import { useMetricsParams } from './useMetricsParams'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'

export const StorageLatencyPanel = () => {
  const getMetricsParams = useMetricsParams()

  const {
    data: diskLatencyHistory = {
      read: [],
      write: [],
      unit: 'ms',
    },
    isLoading,
    hasResponseBeenReceived,
    getResource,
  } = useCosGetRequest(
    getDiskLatencyHistory,
    getMetricsParams(getDiskLatencyHistoryTypeParams),
  )

  useInterval(getResource, CHART_PAGE_POLLING_INTERVAL, { immediate: false })

  const showLoading = !hasResponseBeenReceived && isLoading

  return (
    <CosGeneralPanel topic="Storage Latency" className="flex-1">
      <StorageChart
        read={diskLatencyHistory.read}
        write={diskLatencyHistory.write}
        unit={diskLatencyHistory.unit}
        formatter={toAbbreviation}
        isLoading={showLoading}
      />
    </CosGeneralPanel>
  )
}
