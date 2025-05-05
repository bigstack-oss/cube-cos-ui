import { MetricsApiGetMetricByHostOrVmRequest, Node } from '@cube-frontend/api'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { useContext, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Panel } from './Panel'
import {
  chartTimeRanges,
  computeChartData,
  getMemoryChartOptions,
} from './nodeChartsUtils'

type MemoryPerformanceChartProps = {
  node: Node | undefined
}

export const MemoryPerformanceChart = (props: MemoryPerformanceChartProps) => {
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
        metricType: 'memoryUsage',
        viewType: 'history',
        entityType: 'hosts',
        entityIdOrName: node.hostname,
        past: timeRange,
      }
    },
  )

  useSequentialInterval(
    () => {
      if (node) {
        getMetrics()
      }
    },
    5000,
    {
      immediate: false,
    },
  )

  const chartData = useMemo(
    () => computeChartData(metricsData, 'memory'),
    [metricsData],
  )

  const chartOptions = useMemo(
    () => getMemoryChartOptions(metricsData),
    [metricsData],
  )

  return (
    <Panel className="flex-1 gap-y-6">
      <div className="flex items-center justify-between">
        <span className="secondary-h4 text-functional-text">
          Memory Performance
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
