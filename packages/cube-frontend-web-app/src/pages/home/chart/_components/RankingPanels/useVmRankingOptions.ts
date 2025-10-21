import { GetMetricByTypesMetricTypeEnum } from '@cube-frontend/api'
import { useTranslation } from 'react-i18next'

export type VmRankingItem = {
  name: string
  metricType: GetMetricByTypesMetricTypeEnum
}

export const useVmRankingOptions = (): VmRankingItem[] => {
  const { t } = useTranslation()

  return [
    {
      name: t('home.chart.vm.cpuUsage'),
      metricType: GetMetricByTypesMetricTypeEnum.CpuUsage,
    },
    {
      name: t('home.chart.vm.memoryUsage'),
      metricType: GetMetricByTypesMetricTypeEnum.MemoryUsage,
    },
    {
      name: t('home.chart.vm.diskIoRead'),
      metricType: GetMetricByTypesMetricTypeEnum.DiskReadIops,
    },
    {
      name: t('home.chart.vm.diskIoWrite'),
      metricType: GetMetricByTypesMetricTypeEnum.DiskWriteIops,
    },
    {
      name: t('home.chart.vm.ingressTraffic'),
      metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficIn,
    },
    {
      name: t('home.chart.vm.egressTraffic'),
      metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficOut,
    },
  ]
}
