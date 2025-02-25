import { GetMetricsResponseData } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosCountSegmentedChartCountInfo,
  CosPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'

export type MetricsPanelContentProps = {
  metrics: GetMetricsResponseData
}

export const MetricsPanelContent = (props: MetricsPanelContentProps) => {
  const { metrics } = props

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
      color: 'fill-chart-4',
      count: metrics.host.role.controlConverged,
    },
    {
      name: 'Control',
      color: 'fill-chart-1',
      count: metrics.host.role.control,
    },
    {
      name: 'Compute',
      color: 'fill-chart-2',
      count: metrics.host.role.compute,
    },
    {
      name: 'Storage',
      color: 'fill-chart-3',
      count: metrics.host.role.storage,
    },
    {
      name: 'Others',
      color: 'fill-chart-5',
      count: metrics.host.role.others,
    },
  ]

  const totalRoles = Object.values(metrics.host.role).reduce(
    (total, count) => total + count,
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
        <CosPanel.Item topic="VM Summary" subtext={`${vmTotalCount} Instances`}>
          <CosCountSegmentedChart
            overview={{ name: 'Total VM', count: vmTotalCount }}
            countInfos={vmSummary}
          />
        </CosPanel.Item>
        <CosPanel.Item topic="Role Summary" subtext={`${totalRoles} Roles`}>
          <CosCountSegmentedChart countInfos={roleSummary} />
        </CosPanel.Item>
      </CosPanel.Col>
      <CosPanel.Item topic="VM allocation">
        <div className="flex flex-row justify-between gap-x-7">
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={metrics.vm.usage.vcpu.totalCores}
            used={metrics.vm.usage.vcpu.usedCores}
          />
          <CosPercentagePieChart
            title="Memory"
            unit={memoryReadableSizeUnit}
            total={memoryTotalReadableSize}
            used={memoryUsedReadableSize}
          />
          <CosPercentagePieChart
            title="Storage"
            unit={storageReadableSizeUnit}
            total={storageTotalReadableSize}
            used={storageUsedReadableSize}
          />
        </div>
      </CosPanel.Item>
    </CosPanel.Row>
  )
}
