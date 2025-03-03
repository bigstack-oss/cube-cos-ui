import { GetMetricsResponseData, RoleUsage } from '@cube-frontend/api'
import {
  CosBarChart,
  CosGeneralPanel,
  CosSkeleton,
  CosStroke,
} from '@cube-frontend/ui-library'

type NodeMetricsItemProps = {
  name: string
  nodeCount?: number
  cpuUsedPercent: number
  memoryUsedPercent: number
  isLoading: boolean
}

const NodeMetricsItem = (props: NodeMetricsItemProps) => {
  const { name, nodeCount, cpuUsedPercent, memoryUsedPercent, isLoading } =
    props

  const renderNodeCount = () => {
    if (nodeCount === undefined) return null
    if (isLoading) return <CosSkeleton className="h-[18px] w-[48px]" />

    return (
      <span className="primary-body3 text-functional-text">{nodeCount}</span>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-y-3">
      <div className="flex items-center gap-x-3">
        <span className="primary-body2 font-medium text-functional-title">
          {name}
        </span>
        {renderNodeCount()}
      </div>
      <div className="flex gap-x-6">
        <CosBarChart
          isLoading={isLoading}
          progress={Math.floor(cpuUsedPercent)}
          color="bg-chart-1"
          title="CPU"
        />
        <CosBarChart
          isLoading={isLoading}
          progress={Math.floor(memoryUsedPercent)}
          color="bg-chart-1"
          title="Memory"
        />
      </div>
    </div>
  )
}

export type UsagePanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const UsagePanel = (props: UsagePanelProps) => {
  const { metrics, isLoading } = props

  const roleGroups: { name: string; value: RoleUsage }[][] = [
    [
      {
        name: 'Control-converged',
        value: metrics.host.role.controlConverged,
      },
      {
        name: 'Control',
        value: metrics.host.role.control,
      },
    ],
    [
      {
        name: 'Compute',
        value: metrics.host.role.compute,
      },
      {
        name: 'Storage',
        value: metrics.host.role.storage,
      },
    ],
    [
      {
        name: 'Edge-core',
        value: metrics.host.role.edgeCore,
      },
      {
        name: 'Moderator',
        value: metrics.host.role.moderator,
      },
    ],
  ]

  return (
    <CosGeneralPanel topic="Usage">
      <div className="flex flex-col gap-y-4">
        <NodeMetricsItem
          name="Data Center"
          cpuUsedPercent={metrics.dataCenter.usage.cpu.usedPercent}
          memoryUsedPercent={metrics.dataCenter.usage.memory.usedPercent}
          isLoading={isLoading}
        />
        <CosStroke />
        {roleGroups.map((roleGroup, index) => (
          <div key={index} className="flex items-center gap-x-4">
            {roleGroup.map((roleUsage, index) => (
              <NodeMetricsItem
                key={index}
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
