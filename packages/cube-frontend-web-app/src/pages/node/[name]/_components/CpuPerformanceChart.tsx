import { MetricsApiGetMetricByHostOrVmRequest, Node } from '@cube-frontend/api'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { TimeRangeDropdown } from '@cube-frontend/web-app/pages/events/chart/_components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/pages/events/chart/_components/TimeRangeDropdown/useTimeRange'
import { useContext, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Panel } from './Panel'
import { computeChartData, getCpuChartOptions } from './nodeChartsUtils'

type CpuPerformanceChartProps = {
  node: Node | undefined
}

export const CpuPerformanceChart = (props: CpuPerformanceChartProps) => {
  const { node } = props

  const { name: dataCenter } = useContext(DataCenterContext)

  const { timeRange, past, onTimeRangeChange } = useTimeRange('lastHour')

  const { data: metricsData, getResource: getMetrics } = useCosGetRequest(
    metricsApi.getMetricByHostOrVm,
    (): MetricsApiGetMetricByHostOrVmRequest | undefined => {
      if (!node) return undefined
      return {
        dataCenter,
        metricType: 'cpuUsage',
        viewType: 'history',
        entityType: 'hosts',
        entityIdOrName: node.hostname,
        past,
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
    () => computeChartData(metricsData, 'cpu'),
    [metricsData],
  )

  const chartOptions = useMemo(
    () => getCpuChartOptions(metricsData?.unit ?? ''),
    [metricsData?.unit],
  )

  return (
    <Panel className="flex-1 gap-y-6">
      <div className="flex items-center justify-between">
        <span className="secondary-h4 text-functional-text">
          CPU Performance
        </span>
        <TimeRangeDropdown
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
