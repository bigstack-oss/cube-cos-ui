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
import { Panel } from './Panel'
import {
  chartTimeRanges,
  computeChartData,
  getCpuChartOptions,
} from './nodeChartsUtils'

type CpuPerformanceChartProps = {
  node: Node | undefined
}

// TODO: extract polling interval to prop
export const CpuPerformanceChart = (props: CpuPerformanceChartProps) => {
  const { node } = props

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
        metricType: 'cpuUsage',
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
    () => computeChartData(metricsData, 'cpu'),
    [metricsData],
  )

  const chartOptions = useMemo(
    () => getCpuChartOptions(metricsData),
    [metricsData],
  )

  return (
    <Panel className="flex-1 gap-y-6">
      <div className="flex items-center justify-between">
        <span className="secondary-h4 text-functional-text">
          CPU Performance
        </span>
        <TimeRangeDropdown
          timeRanges={chartTimeRanges}
          selectedItem={timeRange}
          disabled={!node}
          onChange={onTimeRangeChange}
        />
      </div>
      <div className="h-[400px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </Panel>
  )
}
