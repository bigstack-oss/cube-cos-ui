import {
  GetDataCentersResponseDataInnerTypeEnum,
  GetMetricsResponseData,
  RoleUsage,
} from '@cube-frontend/api'

export type RoleGroup = {
  name: string
  value: RoleUsage
}[]

export const metricsToRoleGroups = (
  metrics: GetMetricsResponseData,
  dataCenterType: GetDataCentersResponseDataInnerTypeEnum,
): RoleGroup[] => {
  const mapFns: Record<
    GetDataCentersResponseDataInnerTypeEnum,
    (metrics: GetMetricsResponseData) => RoleGroup[]
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
  return fn(metrics)
}

const mapCloudRoleGroups = (metrics: GetMetricsResponseData): RoleGroup[] => {
  return [
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
  ]
}

const mapEdgeRoleGroups = (metrics: GetMetricsResponseData): RoleGroup[] => {
  return [
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
}
