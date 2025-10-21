import { GetMetricByTypesMetricTypeEnum } from '@cube-frontend/api'
import { useTranslation } from 'react-i18next'

export type HostRankingItem = {
  name: string
  metricType: GetMetricByTypesMetricTypeEnum
}

export const useHostRankingOptions = (): HostRankingItem[] => {
  const { t } = useTranslation()

  return [
    {
      name: t(`home.chart.host.cpuUsage`),
      metricType: GetMetricByTypesMetricTypeEnum.CpuUsage,
    },
    {
      name: t(`home.chart.host.memoryUsage`),
      metricType: GetMetricByTypesMetricTypeEnum.MemoryUsage,
    },
    {
      name: t(`home.chart.host.diskUsage`),
      metricType: GetMetricByTypesMetricTypeEnum.DiskUsage,
    },
    {
      name: t(`home.chart.host.ingressTraffic`),
      metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficIn,
    },
    {
      name: t(`home.chart.host.egressTraffic`),
      metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficOut,
    },
  ]
}
