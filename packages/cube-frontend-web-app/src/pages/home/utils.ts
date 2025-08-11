import {
  DataCenterRolesEnum,
  GetMetricsResponseData,
  RoleUsage,
} from '@cube-frontend/api'
import { CosCountSegmentedChartCountInfo } from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'
import { upperFirst } from 'lodash'

export const toMetricsChart = (
  metrics: GetMetricsResponseData,
  availableRoles: DataCenterRolesEnum[],
) => {
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

  const allRoleCountInfos = [
    {
      name: DataCenterRolesEnum.ControlConverged,
      color: 'fill-chart-1',
      count: metrics.host.role.controlConverged.count,
    },
    {
      name: DataCenterRolesEnum.Control,
      color: 'fill-chart-2',
      count: metrics.host.role.control.count,
    },
    {
      name: DataCenterRolesEnum.Compute,
      color: 'fill-chart-3',
      count: metrics.host.role.compute.count,
    },
    {
      name: DataCenterRolesEnum.Storage,
      color: 'fill-chart-5',
      count: metrics.host.role.storage.count,
    },
    {
      name: DataCenterRolesEnum.EdgeCore,
      color: 'fill-chart-8',
      count: metrics.host.role.edgeCore.count,
    },
    {
      name: DataCenterRolesEnum.Moderator,
      color: 'fill-chart-9',
      count: metrics.host.role.moderator.count,
    },
  ] satisfies CosCountSegmentedChartCountInfo[]

  const availableRolesSet = new Set(availableRoles)

  const availableRoleCountInfos: CosCountSegmentedChartCountInfo[] =
    allRoleCountInfos
      .filter((info) => availableRolesSet.has(info.name))
      .map((info) => ({
        ...info,
        name: upperFirst(info.name),
      }))

  const totalRolesCount: number = Object.values(metrics.host.role).reduce(
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
      countInfos: availableRoleCountInfos,
      count: totalRolesCount,
    },
    cpuPieChart: {
      unit: 'vCPU',
      total: metrics.vm.usage.vcpu.totalCores,
      used: metrics.vm.usage.vcpu.usedCores,
      percentage: metrics.vm.usage.vcpu.usedPercent,
    },
    memoryPieChart: {
      unit: memoryReadableSizeUnit,
      total: memoryTotalReadableSize,
      used: memoryUsedReadableSize,
      percentage: metrics.vm.usage.memory.usedPercent,
    },
    storagePieChart: {
      unit: storageReadableSizeUnit,
      total: storageTotalReadableSize,
      used: storageUsedReadableSize,
      percentage: metrics.vm.usage.storage.usedPercent,
    },
  }
}
