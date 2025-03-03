import { useContext } from 'react'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import { CosPanel } from '@cube-frontend/ui-library'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { ChartPanelContent } from './ChartPanelContent'
import { links } from '../../../links'
import { defaultMetrics } from './utils'

const ChartPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: metrics = defaultMetrics, isLoading } = useCosGetRequest(
    metricsApi.getMetricsOverview,
    () => {
      if (!dataCenter.name) return

      return {
        dataCenter: dataCenter.name,
      } satisfies MetricsApiGetMetricsOverviewRequest
    },
  )

  const updateTime = useUpdateTime(metrics, isLoading)

  return (
    <CosPanel
      title="Chart"
      time={updateTime}
      hyperLinkProps={{ href: links.chart }}
      isTimeLoading={isLoading}
    >
      <ChartPanelContent isLoading={isLoading} metrics={metrics} />
    </CosPanel>
  )
}

export default ChartPanel
