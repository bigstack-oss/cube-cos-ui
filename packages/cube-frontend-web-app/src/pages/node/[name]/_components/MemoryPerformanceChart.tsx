import { useTranslation } from 'react-i18next'
import { MetricsApiGetMetricByHostOrVmRequest, Node } from '@cube-frontend/api'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useContext, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { NODE_DETAILS_POLLING_INTERVAL } from '../NodeDetailsPageUtils'
import {
  chartTimeRanges,
  computeChartData,
  getMemoryChartOptions,
} from './nodeChartsUtils'
import { CosGeneralPanel } from '@cube-frontend/ui-library'

type MemoryPerformanceChartProps = {
  node: Node | undefined
}

export const MemoryPerformanceChart = (props: MemoryPerformanceChartProps) => {
  const { node } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const { timeRange, onTimeRangeChange } = useTimeRange({
    includes: chartTimeRanges,
    defaultValue: '1h',
  })

  const { data: metricsData, getResource: getMetrics } = useCosGetRequest(
    metricsApi.getMetricByHostOrVm,
    (): MetricsApiGetMetricByHostOrVmRequest | undefined => {
      if (!node) return undefined
      return {
        dataCenter: dataCenter!.name,
        metricType: 'memoryUsage',
        viewType: 'history',
        entityType: 'hosts',
        entityIdOrName: node.hostname,
        past: timeRange,
      }
    },
  )

  usePolling(async () => {
    if (node) {
      await getMetrics()
    }
  }, NODE_DETAILS_POLLING_INTERVAL)

  const chartData = useMemo(
    () => computeChartData(metricsData, 'memory'),
    [metricsData],
  )

  const chartOptions = useMemo(
    () =>
      getMemoryChartOptions(metricsData, t('nodes.details.consumedHostMemory')),
    [metricsData, t],
  )

  return (
    <CosGeneralPanel
      topic={t('node.details.memoryPerformance')}
      rightSlot={
        <TimeRangeDropdown
          timeRanges={chartTimeRanges}
          selectedItem={timeRange}
          disabled={!node}
          onChange={onTimeRangeChange}
        />
      }
      containerClassName="flex-1"
    >
      <div className="h-[400px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </CosGeneralPanel>
  )
}
