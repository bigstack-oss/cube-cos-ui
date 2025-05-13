import { GetMetricsResponseData } from '@cube-frontend/api'
import { CosGeneralPanel, CosStroke } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useMemo } from 'react'
import { UsageMetricsItem } from './UsageMetricsItem'
import { metricsToRoleGroups, RoleGroup } from './usagePanelUtils'

export type UsagePanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const UsagePanel = (props: UsagePanelProps) => {
  const { metrics, isLoading } = props

  const { dataCenter } = useContext(DataCenterContext)

  const roleGroups = useMemo<RoleGroup[]>(
    () => metricsToRoleGroups(metrics, dataCenter!.type),
    [metrics, dataCenter],
  )

  return (
    <CosGeneralPanel topic="Usage">
      <div className="flex flex-col gap-y-4">
        <UsageMetricsItem
          name="Data Center"
          cpuUsedPercent={metrics.dataCenter.usage.cpu.usedPercent}
          memoryUsedPercent={metrics.dataCenter.usage.memory.usedPercent}
          isLoading={isLoading}
        />
        <CosStroke />
        {roleGroups.map((roleGroup, index) => (
          <div key={index} className="flex items-center gap-x-4">
            {roleGroup.map((roleUsage) => (
              <UsageMetricsItem
                key={roleUsage.name}
                nodeCount={roleUsage.value.count}
                name={roleUsage.name}
                cpuUsedPercent={roleUsage.value.cpu.usedPercent}
                memoryUsedPercent={roleUsage.value.memory.usedPercent}
                isLoading={isLoading}
              />
            ))}
          </div>
        ))}
      </div>
    </CosGeneralPanel>
  )
}
