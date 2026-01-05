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
        name: t('home.chart.usage.controlConvergedNodes'),
        value: metrics.host.role.controlConverged,
      },
      {
        name: t('home.chart.usage.controlNodes'),
        value: metrics.host.role.control,
      },
    ],
    [
      {
        name: t('home.chart.usage.computeNodes'),
        value: metrics.host.role.compute,
      },
      {
        name: t('home.chart.usage.storageNodes'),
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
        name: t('home.chart.usage.edgeCoreNodes'),
        value: metrics.host.role.edgeCore,
      },
      {
        name: t('home.chart.usage.moderatorNodes'),
        value: metrics.host.role.moderator,
      },
    ],
  ]
}
