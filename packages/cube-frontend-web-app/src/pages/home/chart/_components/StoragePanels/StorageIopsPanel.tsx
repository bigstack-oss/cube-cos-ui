import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'
import {
  CHART_PAGE_POLLING_INTERVAL,
  getDiskIopsHistory,
  getDiskIopsHistoryTypeParams,
} from '../utils'
import { useMetricsParams } from './useMetricsParams'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'

export const StorageIopsPanel = () => {
  const getMetricsParams = useMetricsParams()
  const {
    data: diskIopsHistory = {
      read: [],
      write: [],
      unit: 'ops',
    },
    isLoading,
    hasResponseBeenReceived,
    getResource,
  } = useCosGetRequest(
    getDiskIopsHistory,
    getMetricsParams(getDiskIopsHistoryTypeParams),
  )

  useInterval(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = !hasResponseBeenReceived && isLoading

  return (
    <CosGeneralPanel topic="Storage IOPs" className="flex-1">
      <StorageChart
        read={diskIopsHistory.read}
        write={diskIopsHistory.write}
        unit={diskIopsHistory.unit}
        unitSuffix="/s"
        formatter={toAbbreviation}
        isLoading={showLoading}
      />
    </CosGeneralPanel>
  )
}
