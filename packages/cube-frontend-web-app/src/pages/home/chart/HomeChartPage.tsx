import { ChartPanel } from './_components/ChartPanel/ChartPanel'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { defaultMetrics } from '../overview/_components/ChartPanel/utils'
import { useContext } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'

export const HomeChartPage = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: metrics = defaultMetrics, isLoading: isMetricsLoading } =
    useCosStreamRequest(metricsApi.getMetricsOverview, () => {
      if (!dataCenter.name) return

      return {
        dataCenter: dataCenter.name,
      } satisfies MetricsApiGetMetricsOverviewRequest
    })

  return (
    <div className="mt-6 flex flex-col gap-y-4">
      <ChartPanel metrics={metrics} isLoading={isMetricsLoading} />
    </div>
  )
}
