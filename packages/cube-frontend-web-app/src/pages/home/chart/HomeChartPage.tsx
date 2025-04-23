import { useContext } from 'react'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { UsagePanel } from './_components/UsagePanel/UsagePanel'
import { ChartPanel } from './_components/ChartPanel/ChartPanel'
import { RankingPanels } from './_components/RankingPanels/RankingPanels'
import { StoragePanels } from './_components/StoragePanels/StoragePanels'
import { ExtraInformationPanel } from './_components/ExtraInformationPanel/ExtraInformationPanel'
import { defaultMetrics } from '../overview/_components/ChartPanel/utils'
import { CHART_PAGE_POLLING_INTERVAL } from './_components/utils'

export const HomeChartPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data: metrics = defaultMetrics,
    isLoading: isMetricsLoading,
    hasResponseBeenReceived,
    getResource: getMetrics,
  } = useCosGetRequest(metricsApi.getMetricsOverview, () => {
    return {
      dataCenter: dataCenter!.name,
    } satisfies MetricsApiGetMetricsOverviewRequest
  })

  useSequentialInterval(getMetrics, CHART_PAGE_POLLING_INTERVAL, {
    immediate: false,
  })

  const showMetricsLoading = !hasResponseBeenReceived && isMetricsLoading

  return (
    <div className="mt-6 flex flex-col gap-y-4">
      <UsagePanel metrics={metrics} isLoading={showMetricsLoading} />
      <ChartPanel metrics={metrics} isLoading={showMetricsLoading} />
      <StoragePanels />
      <RankingPanels />
      <ExtraInformationPanel />
    </div>
  )
}
