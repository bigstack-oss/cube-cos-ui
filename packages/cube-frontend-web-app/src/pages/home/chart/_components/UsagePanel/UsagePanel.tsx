import { GetMetricsResponseData, RoleUsage } from '@cube-frontend/api'
import { CosGeneralPanel, CosStroke } from '@cube-frontend/ui-library'
import { UsageMetricsItem } from './UsageMetricsItem'

type RoleGroup = {
  name: string
  value: RoleUsage
}[]

export type UsagePanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const UsagePanel = (props: UsagePanelProps) => {
  const { metrics, isLoading } = props

  const roleGroups: RoleGroup[] = [
    [
      {
        name: 'Control-converged Nodes',
        value: metrics.host.role.controlConverged,
      },
      {
        name: 'Control Nodes',
        value: metrics.host.role.control,
      },
    ],
    [
      {
        name: 'Compute Nodes',
        value: metrics.host.role.compute,
      },
      {
        name: 'Storage Nodes',
        value: metrics.host.role.storage,
      },
    ],
    [
      {
        name: 'Edge-core Nodes',
        value: metrics.host.role.edgeCore,
      },
      {
        name: 'Moderator Nodes',
        value: metrics.host.role.moderator,
      },
    ],
  ]

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
