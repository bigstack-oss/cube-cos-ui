import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'
import {
  CHART_PAGE_POLLING_INTERVAL,
  getDiskBandwidthHistory,
  getDiskBandwidthHistoryTypeParams,
} from '../utils'
import { useMetricsParams } from './useMetricsParams'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'

export const StorageBandwidthPanel = () => {
  const getMetricsParams = useMetricsParams()
  const {
    data: diskBandWidthHistory = {
      read: [],
      write: [],
      unit: 'bytes',
    },
    isLoading,
    hasResponseBeenReceived,
    getResource,
  } = useCosGetRequest(
    getDiskBandwidthHistory,
    getMetricsParams(getDiskBandwidthHistoryTypeParams),
  )

  useInterval(getResource, CHART_PAGE_POLLING_INTERVAL, { immediate: false })

  const showLoading = !hasResponseBeenReceived && isLoading

  return (
    <CosGeneralPanel topic="Storage Bandwidth" className="flex-1">
      <StorageChart
        read={diskBandWidthHistory.read}
        write={diskBandWidthHistory.write}
        unit={diskBandWidthHistory.unit}
        unitSuffix="/s"
        formatter={toAbbreviation}
        isLoading={showLoading}
      />
    </CosGeneralPanel>
  )
}
