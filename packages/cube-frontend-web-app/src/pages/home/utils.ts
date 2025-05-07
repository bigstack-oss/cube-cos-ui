import { GetMetricsResponseData, RoleUsage } from '@cube-frontend/api'
import { CosCountSegmentedChartCountInfo } from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'

export const toMetricsChart = (metrics: GetMetricsResponseData) => {
  const vmCountInfos: CosCountSegmentedChartCountInfo[] = [
    {
      name: 'Running',
      color: 'fill-chart-2',
      count: metrics.vm.status.running,
    },
    {
      name: 'Stopped',
      color: 'fill-status-warning',
      count: metrics.vm.status.stopped,
    },
    {
      name: 'Suspended',
      color: 'fill-chart-1',
      count: metrics.vm.status.suspend,
    },
    {
      name: 'Paused',
      color: 'fill-status-paused',
      count: metrics.vm.status.paused,
    },
    {
      name: 'Error',
      color: 'fill-status-negative',
      count: metrics.vm.status.error,
    },
  ]

  // TODO: define roles enum in the openAPI.
  const roleCountInfos: CosCountSegmentedChartCountInfo[] = [
    {
      name: 'Control-converged',
      color: 'fill-chart-1',
      count: metrics.host.role.controlConverged.count,
    },
    {
      name: 'Control',
      color: 'fill-chart-2',
      count: metrics.host.role.control.count,
    },
    {
      name: 'Compute',
      color: 'fill-chart-3',
      count: metrics.host.role.compute.count,
    },
    {
      name: 'Storage',
      color: 'fill-chart-5',
      count: metrics.host.role.storage.count,
    },
    {
      name: 'Edge-core',
      color: 'fill-chart-8',
      count: metrics.host.role.edgeCore.count,
    },
    {
      name: 'Moderator',
      color: 'fill-chart-9',
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

  return {
    vmBarChart: {
      countInfos: vmCountInfos,
      count: metrics.vm.status.total,
    },
    roleBarChart: {
      countInfos: roleCountInfos,
      count: totalRoles,
    },
    cpuPieChart: {
      unit: 'vCPU',
      total: metrics.vm.usage.vcpu.totalCores,
      used: metrics.vm.usage.vcpu.usedCores,
    },
    memoryPieChart: {
      unit: memoryReadableSizeUnit,
      total: memoryTotalReadableSize,
      used: memoryUsedReadableSize,
    },
    storagePieChart: {
      unit: storageReadableSizeUnit,
      total: storageTotalReadableSize,
      used: storageUsedReadableSize,
    },
  }
}
