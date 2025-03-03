import { GetMetricsResponseData, RoleUsage } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosCountSegmentedChartCountInfo,
  CosPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'

export type ChartPanelContentProps = {
  isLoading: boolean
  metrics: GetMetricsResponseData
}

export const ChartPanelContent = (props: ChartPanelContentProps) => {
  const { isLoading, metrics } = props

  const vmSummary: CosCountSegmentedChartCountInfo[] = [
    {
      name: 'Running',
      color: 'fill-chart-2',
      count: metrics.vm.status.running,
    },
    {
      name: 'Stopped',
      color: 'fill-chart-4',
      count: metrics.vm.status.stopped,
    },
    {
      name: 'Suspended',
      color: 'fill-chart-3',
      count: metrics.vm.status.suspend,
    },
    {
      name: 'Paused',
      color: 'fill-chart-6',
      count: metrics.vm.status.paused,
    },
    {
      name: 'Error',
      color: 'fill-status-negative',
      count: metrics.vm.status.error,
    },
  ]
  const vmTotalCount = metrics.vm.status.total

  const roleSummary: CosCountSegmentedChartCountInfo[] = [
    {
      name: 'Control-converged',
      color: 'fill-chart-6',
      count: metrics.host.role.controlConverged.count,
    },
    {
      name: 'Control',
      color: 'fill-chart-1',
      count: metrics.host.role.control.count,
    },
    {
      name: 'Compute',
      color: 'fill-chart-2',
      count: metrics.host.role.compute.count,
    },
    {
      name: 'Storage',
      color: 'fill-chart-3',
      count: metrics.host.role.storage.count,
    },
    {
      name: 'Edge-core',
      color: 'fill-chart-4',
      count: metrics.host.role.edgeCore.count,
    },
    {
      name: 'Moderator',
      color: 'fill-chart-5',
      count: metrics.host.role.moderator.count,
    },
  ]

  const totalRoles: number = Object.values(metrics.host.role).reduce(
    (total, role: RoleUsage) => total + role.count,
    0,
  )

  const {
    total: memoryTotalReadableSize,
    used: memoryUsedReadableSize,
    sizeUnit: memoryReadableSizeUnit,
  } = toReadableUsedSize({
    total: metrics.vm.usage.memory.totalMiB,
    used: metrics.vm.usage.memory.usedMiB,
    originalSizeUnit: 'MiB',
  })

  const {
    total: storageTotalReadableSize,
    used: storageUsedReadableSize,
    sizeUnit: storageReadableSizeUnit,
  } = toReadableUsedSize({
    total: metrics.vm.usage.storage.totalMiB,
    used: metrics.vm.usage.storage.usedMiB,
    originalSizeUnit: 'MiB',
  })

  return (
    <CosPanel.Row>
      <CosPanel.Col className="flex-1">
        <CosPanel.Item
          topic="VM Summary"
          subtext={`${vmTotalCount} Instances`}
          isSubtextLoading={isLoading}
        >
          <CosCountSegmentedChart
            isLoading={isLoading}
            skeletonCount={5}
            overview={{ name: 'Total VM', count: vmTotalCount }}
            countInfos={vmSummary}
          />
        </CosPanel.Item>
        <CosPanel.Item
          topic="Role Summary"
          subtext={`${totalRoles} Roles`}
          isSubtextLoading={isLoading}
        >
          <CosCountSegmentedChart
            isLoading={isLoading}
            skeletonCount={4}
            countInfos={roleSummary}
          />
        </CosPanel.Item>
      </CosPanel.Col>
      <CosPanel.Item topic="VM allocation">
        <div className="flex flex-row justify-between gap-x-7">
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={metrics.vm.usage.vcpu.totalCores}
            used={metrics.vm.usage.vcpu.usedCores}
            isLoading={isLoading}
          />
          <CosPercentagePieChart
            title="Memory"
            unit={memoryReadableSizeUnit}
            total={memoryTotalReadableSize}
            used={memoryUsedReadableSize}
            isLoading={isLoading}
          />
          <CosPercentagePieChart
            title="Storage"
            unit={storageReadableSizeUnit}
            total={storageTotalReadableSize}
            used={storageUsedReadableSize}
            isLoading={isLoading}
          />
        </div>
      </CosPanel.Item>
    </CosPanel.Row>
  )
}
