import { useTranslation } from 'react-i18next'
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
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'

export const StorageLatencyPanel = () => {
  const { t } = useTranslation()

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

  const { isPolling } = usePolling(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    hasResponseBeenReceived,
    isLoading,
    isPolling,
  })

  return (
    <CosGeneralPanel
      topic={t('home.chart.storage.storageLatency')}
      className="flex-1"
    >
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
