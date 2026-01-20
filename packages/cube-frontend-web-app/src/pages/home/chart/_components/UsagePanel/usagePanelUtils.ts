import { TFunction } from 'i18next'
import {
  DataCenterTypeEnum,
  GetMetricsResponseData,
  RoleUsage,
} from '@cube-frontend/api'

export type RoleGroup = {
  name: string
  value: RoleUsage
}[]

export const metricsToRoleGroups = (
  metrics: GetMetricsResponseData,
  dataCenterType: DataCenterTypeEnum,
  t: TFunction,
): RoleGroup[] => {
  const mapFns: Record<
    DataCenterTypeEnum,
    (metrics: GetMetricsResponseData, t: TFunction) => RoleGroup[]
  > = {
    cloud: mapCloudRoleGroups,
    edge: mapEdgeRoleGroups,
  }
  const fn = mapFns[dataCenterType]
  if (!fn) {
    console.warn(
      `Cannot find the role groups mapper for data center with type ${dataCenterType}`,
    )
    return []
  }
  return fn(metrics, t)
}

const mapCloudRoleGroups = (
  metrics: GetMetricsResponseData,
  t: TFunction,
): RoleGroup[] => {
  return [
    [
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.control-converged'),
        }),
        value: metrics.host.role.controlConverged,
      },
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.control'),
        }),
        value: metrics.host.role.control,
      },
    ],
    [
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.compute'),
        }),
        value: metrics.host.role.compute,
      },
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.storage'),
        }),
        value: metrics.host.role.storage,
      },
    ],
  ]
}

const mapEdgeRoleGroups = (
  metrics: GetMetricsResponseData,
  t: TFunction,
): RoleGroup[] => {
  return [
    [
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.edge-core'),
        }),
        value: metrics.host.role.edgeCore,
      },
      {
        name: t('home.chart.usage.nodeRole', {
          role: t('common.node.roles.moderator'),
        }),
        value: metrics.host.role.moderator,
      },
    ],
  ]
}
