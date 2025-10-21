import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GetMetricsResponseData } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosGeneralPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import ScrollContainer from '@cube-frontend/web-app/components/ScrollContainer/ScrollContainer'
import { useMediaQuery } from '@cube-frontend/web-app/hooks/useMediaQuery'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CpuPercentagePieChart } from '@cube-frontend/web-app/components/CpuPercentagePieChart/CpuPercentagePieChart'
import { toMetricsChart } from '../../../utils'

export type ChartPanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const ChartPanel = (props: ChartPanelProps) => {
  const { metrics, isLoading } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const roles = dataCenter!.roles

  const {
    vmBarChart,
    roleBarChart,
    cpuPieChart,
    memoryPieChart,
    storagePieChart,
  } = useMemo(() => toMetricsChart(metrics, roles, t), [metrics, roles, t])

  const isSmallScreen = useMediaQuery({ maxWidth: 1300 })

  const vmAllocationPanel = (
    <CosGeneralPanel topic={t('home.chart.vmAllocation.title')}>
      <div className="flex h-[260px] w-full flex-row justify-around gap-x-[35px] p-5">
        <CpuPercentagePieChart isLoading={isLoading} {...cpuPieChart} />
        <CosPercentagePieChart
          title={t('home.chart.vmAllocation.memory')}
          overThresholdText="Over Limit"
          isLoading={isLoading}
          {...memoryPieChart}
        />
        <CosPercentagePieChart
          title={t('home.chart.vmAllocation.storage')}
          overThresholdText="Over Limit"
          isLoading={isLoading}
          {...storagePieChart}
        />
      </div>
    </CosGeneralPanel>
  )

  return (
    <ScrollContainer className="flex gap-x-5">
      <div className="flex min-w-[500px] flex-1 flex-col gap-y-5">
        <CosGeneralPanel topic={t('home.chart.vmSummary.title')}>
          <CosCountSegmentedChart
            title={t('home.chart.vmSummary.vmStatus')}
            subtext={`${vmBarChart.count} ${t('home.chart.vmSummary.instance', { count: vmBarChart.count })}`}
            overview={{
              name: t('home.chart.vmSummary.totalVm'),
              count: vmBarChart.count,
            }}
            countInfos={vmBarChart.countInfos}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </CosGeneralPanel>
        <CosGeneralPanel topic={t('home.chart.roleSummary.title')}>
          <CosCountSegmentedChart
            title={t('home.chart.roleSummary.roleDistribution')}
            subtext={`${roleBarChart.count} ${t('home.chart.roleSummary.role', { count: roleBarChart.count })}`}
            countInfos={roleBarChart.countInfos}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </CosGeneralPanel>
        {isSmallScreen && vmAllocationPanel}
      </div>
      {!isSmallScreen && vmAllocationPanel}
    </ScrollContainer>
  )
}
