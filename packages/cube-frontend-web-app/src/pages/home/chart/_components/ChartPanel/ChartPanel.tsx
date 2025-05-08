import { GetMetricsResponseData } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosGeneralPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { toMetricsChart } from '../../../utils'
import { useContext, useMemo } from 'react'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

export type ChartPanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const ChartPanel = (props: ChartPanelProps) => {
  const { metrics, isLoading } = props

  const { dataCenter } = useContext(DataCenterContext)

  const roles = dataCenter!.roles

  const {
    vmBarChart,
    roleBarChart,
    cpuPieChart,
    memoryPieChart,
    storagePieChart,
  } = useMemo(() => toMetricsChart(metrics, roles), [metrics, roles])

  return (
    <div className="flex gap-x-5">
      <div className="flex flex-1 flex-col gap-y-5">
        <CosGeneralPanel topic="VM summary">
          <CosCountSegmentedChart
            title="VM Status"
            subtext={toPluralizeDisplay(vmBarChart.count, 'Instance')}
            overview={{ name: 'Total VM', count: vmBarChart.count }}
            countInfos={vmBarChart.countInfos}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </CosGeneralPanel>
        <CosGeneralPanel topic="Role summary">
          <CosCountSegmentedChart
            title="Role Distribution"
            subtext={toPluralizeDisplay(roleBarChart.count, 'Role')}
            countInfos={roleBarChart.countInfos}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </CosGeneralPanel>
      </div>
      <CosGeneralPanel topic="VM allocation">
        <div className="flex h-[260px] flex-row justify-between gap-x-[35px] p-5">
          <CosPercentagePieChart
            title="vCPU"
            isLoading={isLoading}
            {...cpuPieChart}
          />
          <CosPercentagePieChart
            title="Memory"
            isLoading={isLoading}
            {...memoryPieChart}
          />
          <CosPercentagePieChart
            title="Storage"
            isLoading={isLoading}
            {...storagePieChart}
          />
        </div>
      </CosGeneralPanel>
    </div>
  )
}
