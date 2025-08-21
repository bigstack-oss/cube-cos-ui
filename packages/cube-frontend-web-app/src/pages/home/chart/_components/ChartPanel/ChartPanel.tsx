import { GetMetricsResponseData } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosGeneralPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import ScrollContainer from '@cube-frontend/web-app/components/ScrollContainer/ScrollContainer'
import { useMediaQuery } from '@cube-frontend/web-app/hooks/useMediaQuery'
import { useContext, useMemo } from 'react'
import { toMetricsChart } from '../../../utils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CpuPercentagePieChart } from '@cube-frontend/web-app/components/CpuPercentagePieChart/CpuPercentagePieChart'
import { useTranslation } from 'react-i18next'

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
    <CosGeneralPanel topic={t('home.overview.chart.totalVm')}>
      <div className="flex h-[260px] w-full flex-row justify-around gap-x-[35px] p-5">
        <CpuPercentagePieChart isLoading={isLoading} {...cpuPieChart} />
        <CosPercentagePieChart
          title={t('home.overview.chart.memory')}
          overThresholdText="Over Limit"
          isLoading={isLoading}
          {...memoryPieChart}
        />
        <CosPercentagePieChart
          title={t('home.overview.chart.storage')}
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
        <CosGeneralPanel topic={t('home.overview.chart.totalVm')}>
          <CosCountSegmentedChart
            title={t('home.overview.chart.totalVm')}
            subtext={toPluralizeDisplay(vmBarChart.count, 'Instance')}
            overview={{ name: 'Total VM', count: vmBarChart.count }}
            countInfos={vmBarChart.countInfos}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </CosGeneralPanel>
        <CosGeneralPanel topic={t('home.overview.chart.roleSummary')}>
          <CosCountSegmentedChart
            title={t('home.overview.chart.roleSummary')}
            subtext={toPluralizeDisplay(roleBarChart.count, 'Role')}
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
