import { Node, NodeStatusEnum } from '@cube-frontend/api'

const poweringStatuses = new Set<NodeStatusEnum>([
  NodeStatusEnum.PoweringOn,
  NodeStatusEnum.PoweringOff,
  NodeStatusEnum.PoweringCycle,
])

export const isInPoweringStatus = (node?: Pick<Node, 'status'>): boolean => {
  return !!node && poweringStatuses.has(node.status)
}

export const canCreateSupportFile = (node?: Pick<Node, 'status'>): boolean => {
  return !!node && node.status === NodeStatusEnum.Up
}
