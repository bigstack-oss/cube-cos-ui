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
  getCpuChartOptions,
} from './nodeChartsUtils'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import type { SupportedLanguage } from '@cube-frontend/web-app/i18n/utils'

type CpuPerformanceChartProps = {
  node: Node | undefined
}

// TODO: extract polling interval to prop
export const CpuPerformanceChart = (props: CpuPerformanceChartProps) => {
  const { node } = props

  const { t, i18n } = useTranslation()

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
    () =>
      getCpuChartOptions(
        metricsData,
        t('nodes.details.consumedHostCpu'),
        i18n.language as SupportedLanguage,
      ),
    [metricsData, t, i18n],
  )

  return (
    <CosGeneralPanel
      topic={t('nodes.details.cpuPerformance')}
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
