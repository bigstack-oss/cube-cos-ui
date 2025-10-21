import { useTranslation } from 'react-i18next'
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
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'

export const StorageBandwidthPanel = () => {
  const { t } = useTranslation()

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

  const { isPolling } = usePolling(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    hasResponseBeenReceived,
    isLoading,
    isPolling,
  })

  return (
    <CosGeneralPanel
      topic={t('home.chart.storage.storageBandwidth')}
      className="flex-1"
    >
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
