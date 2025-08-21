import { Node, NodeStatusEnum } from '@cube-frontend/api'
import { humanizeDuration } from './date'
import { TFunction } from 'i18next'

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

export const formatUpTime = (
  t: TFunction<'translation', undefined>,
  node?: Pick<Node, 'status' | 'uptimeSeconds'>,
): string => {
  if (node?.status !== NodeStatusEnum.Up) {
    return ''
  }
  return humanizeDuration(t, node.uptimeSeconds)
}
