import { useContext } from 'react'
import { noop } from 'lodash'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import { CosPanel, CosSkeleton } from '@cube-frontend/ui-library'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { MetricsPanelContent } from './MetricsPanelContent'

const MetricsPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: metrics, isLoading } = useCosGetRequest(
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
      hyperLinkProps={{ onClick: noop }}
      isLoading={isLoading}
    >
      {isLoading ? (
        <CosSkeleton className="h-[283px] w-full" />
      ) : (
        metrics && <MetricsPanelContent metrics={metrics} />
      )}
    </CosPanel>
  )
}

export default MetricsPanel
