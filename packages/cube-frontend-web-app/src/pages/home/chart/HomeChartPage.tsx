import { useContext } from 'react'
import { noop } from 'lodash'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'
import { UsagePanel } from './_components/UsagePanel/UsagePanel'
import { ChartPanel } from './_components/ChartPanel/ChartPanel'
import { RankingPanels } from './_components/RankingPanels/RankingPanels'
import { StoragePanels } from './_components/StoragePanels/StoragePanels'
import { defaultMetrics } from '../overview/_components/ChartPanel/utils'
import { CHART_PAGE_POLLING_INTERVAL } from './_components/utils'
import { CosGeneralPanel } from '@cube-frontend/ui-library'

export const HomeChartPage = () => {
  const dataCenter = useContext(DataCenterContext)

  const {
    data: metrics = defaultMetrics,
    isLoading: isMetricsLoading,
    hasResponseBeenReceived,
    getResource: getMetrics,
  } = useCosGetRequest(metricsApi.getMetricsOverview, () => {
    return {
      dataCenter: dataCenter.name,
    } satisfies MetricsApiGetMetricsOverviewRequest
  })

  useInterval(getMetrics, CHART_PAGE_POLLING_INTERVAL, { immediate: false })

  const showMetricsLoading = !hasResponseBeenReceived && isMetricsLoading

  return (
    <div className="mt-6 flex flex-col gap-y-4">
      <UsagePanel metrics={metrics} isLoading={showMetricsLoading} />
      <ChartPanel metrics={metrics} isLoading={showMetricsLoading} />
      <StoragePanels />
      <RankingPanels />
      <CosGeneralPanel.TitleBar
        title="Network"
        hyperLinkProps={{
          children: 'More network on Grafana',
          // TODO: We need the backend API to provide the link.
          onClick: noop,
        }}
      />
    </div>
  )
}
