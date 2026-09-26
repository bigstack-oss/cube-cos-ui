import { TFunction } from 'i18next'
import {
  GetMetricsResponseData,
  GetMetricsResponseDataHostRole,
  NodeRole,
  RoleUsage,
} from '@cube-frontend/api'

export type RoleUsageItem = {
  role: NodeRole
  name: string
  value: RoleUsage
}

const roleMetricKeys: Record<NodeRole, keyof GetMetricsResponseDataHostRole> = {
  [NodeRole.ControlConverged]: 'controlConverged',
  [NodeRole.Control]: 'control',
  [NodeRole.Compute]: 'compute',
  [NodeRole.Storage]: 'storage',
  [NodeRole.EdgeCore]: 'edgeCore',
  [NodeRole.Moderator]: 'moderator',
}

/**
 * One usage item per role that has a registered node, in the data center's
 * order. Roles with no node are left out rather than shown as empty cards.
 */
export const metricsToRoleUsages = (
  metrics: GetMetricsResponseData,
  registeredRoles: NodeRole[],
  t: TFunction,
): RoleUsageItem[] => {
  return registeredRoles.map((role) => ({
    role,
    name: t('home.chart.usage.nodeRole', {
      role: t(`common.node.roles.${role}`),
    }),
    value: metrics.host.role[roleMetricKeys[role]],
  }))
}
