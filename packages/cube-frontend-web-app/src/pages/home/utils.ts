import {
  DataCenterRolesEnum,
  GetMetricsResponseData,
  GetMetricsResponseDataVmStatus,
  RoleUsage,
} from '@cube-frontend/api'
import { CosCountSegmentedChartCountInfo } from '@cube-frontend/ui-library'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'
import { TFunction } from 'i18next'

type VmCountInfo = CosCountSegmentedChartCountInfo & {
  status: keyof GetMetricsResponseDataVmStatus
}

type RoleCountInfo = CosCountSegmentedChartCountInfo & {
  role: DataCenterRolesEnum
}

export const toMetricsChart = (
  metrics: GetMetricsResponseData,
  availableRoles: DataCenterRolesEnum[],
  t: TFunction<'translation', undefined>,
) => {
  const vmCountInfos = [
    {
      status: 'running',
      name: t('home.overview.chart.running'),
      color: 'fill-chart-2',
      count: metrics.vm.status.running,
    },
    {
      status: 'stopped',
      name: t('home.overview.chart.stopped'),
      color: 'fill-status-warning',
      count: metrics.vm.status.stopped,
    },
    {
      status: 'suspend',
      name: t('home.overview.chart.suspended'),
      color: 'fill-chart-1',
      count: metrics.vm.status.suspend,
    },
    {
      status: 'paused',
      name: t('home.overview.chart.paused'),
      color: 'fill-status-paused',
      count: metrics.vm.status.paused,
    },
    {
      status: 'error',
      name: t('home.overview.chart.error'),
      color: 'fill-status-negative',
      count: metrics.vm.status.error,
    },
  ] satisfies VmCountInfo[]

  const allRoleCountInfos = [
    {
      role: DataCenterRolesEnum.ControlConverged,
      name: t(`home.overview.chart.${DataCenterRolesEnum.ControlConverged}`),
      color: 'fill-chart-1',
      count: metrics.host.role.controlConverged.count,
    },
    {
      role: DataCenterRolesEnum.Control,
      name: t(`home.overview.chart.${DataCenterRolesEnum.Control}`),
      color: 'fill-chart-2',
      count: metrics.host.role.control.count,
    },
    {
      role: DataCenterRolesEnum.Compute,
      name: t(`home.overview.chart.${DataCenterRolesEnum.Compute}`),
      color: 'fill-chart-3',
      count: metrics.host.role.compute.count,
    },
    {
      role: DataCenterRolesEnum.Storage,
      name: t(`home.overview.chart.${DataCenterRolesEnum.Storage}`),
      color: 'fill-chart-5',
      count: metrics.host.role.storage.count,
    },
    {
      role: DataCenterRolesEnum.EdgeCore,
      name: t(`home.overview.chart.${DataCenterRolesEnum.EdgeCore}`),
      color: 'fill-chart-8',
      count: metrics.host.role.edgeCore.count,
    },
    {
      role: DataCenterRolesEnum.Moderator,
      name: t(`home.overview.chart.${DataCenterRolesEnum.Moderator}`),
      color: 'fill-chart-9',
      count: metrics.host.role.moderator.count,
    },
  ] satisfies RoleCountInfo[]

  const availableRolesSet = new Set(availableRoles)

  const availableRoleCountInfos: CosCountSegmentedChartCountInfo[] =
    allRoleCountInfos.filter((info) => availableRolesSet.has(info.role))

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
