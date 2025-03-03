import {
  GetMetricsResponseData,
  GetMetricsResponseDataDataCenterUsageCpu,
  GetMetricsResponseDataDataCenterUsageMemory,
  GetMetricsResponseDataVmUsageStorage,
  RoleUsage,
} from '@cube-frontend/api'

const getDefaultCpuUsage = (): GetMetricsResponseDataDataCenterUsageCpu => ({
  totalCores: 0,
  usedCores: 0,
  usedPercent: 0,
  freeCores: 0,
  freePercent: 0,
})

const getDefaultMemoryUsage =
  (): GetMetricsResponseDataDataCenterUsageMemory => ({
    totalMiB: 0,
    usedMiB: 0,
    usedPercent: 0,
    freeMiB: 0,
    freePercent: 0,
  })

const getDefaultStorage = (): GetMetricsResponseDataVmUsageStorage => ({
  totalMiB: 0,
  usedMiB: 0,
  usedPercent: 0,
  freeMiB: 0,
  freePercent: 0,
})

const getDefaultRoleUsage = (): RoleUsage => ({
  count: 0,
  cpu: getDefaultCpuUsage(),
  memory: getDefaultMemoryUsage(),
})

export const defaultMetrics: GetMetricsResponseData = {
  dataCenter: {
    usage: {
      cpu: getDefaultCpuUsage(),
      memory: getDefaultMemoryUsage(),
    },
  },
  vm: {
    status: {
      total: 0,
      running: 0,
      stopped: 0,
      paused: 0,
      suspend: 0,
      error: 0,
    },
    usage: {
      vcpu: getDefaultCpuUsage(),
      memory: getDefaultMemoryUsage(),
      storage: getDefaultStorage(),
    },
  },
  host: {
    role: {
      controlConverged: getDefaultRoleUsage(),
      control: getDefaultRoleUsage(),
      compute: getDefaultRoleUsage(),
      storage: getDefaultRoleUsage(),
      edgeCore: getDefaultRoleUsage(),
      moderator: getDefaultRoleUsage(),
    },
    usages: [],
  },
}
