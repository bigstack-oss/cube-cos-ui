import { useContext } from 'react'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { ChartPanelContent } from './ChartPanelContent'
import { links } from '../../../links'
import { defaultMetrics } from './utils'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'

const ChartPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: metrics = defaultMetrics, isLoading } = useCosStreamRequest(
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
    <CosDashboardPanel
      title="Chart"
      time={updateTime}
      hyperLinkProps={{ href: links.chart }}
      isTimeLoading={isLoading}
    >
      <ChartPanelContent isLoading={isLoading} metrics={metrics} />
    </CosDashboardPanel>
  )
}

export default ChartPanel
