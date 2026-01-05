import { ParseKeys, TFunction } from 'i18next'
import { Node, NodeStatusEnum } from '@cube-frontend/api'
import { humanizeDuration } from './date'

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
  t: TFunction,
  node?: Pick<Node, 'status' | 'uptimeSeconds'>,
): string => {
  if (node?.status !== NodeStatusEnum.Up) {
    return ''
  }
  return humanizeDuration(t, node.uptimeSeconds)
}

export const nodeStatusTranslationKeys: Record<NodeStatusEnum, ParseKeys> = {
  [NodeStatusEnum.Up]: 'nodes.up',
  [NodeStatusEnum.Down]: 'nodes.down',
  [NodeStatusEnum.PoweringOn]: 'nodes.poweringOn',
  [NodeStatusEnum.PoweringOff]: 'nodes.poweringOff',
  [NodeStatusEnum.PoweringCycle]: 'nodes.poweringCycle',
  [NodeStatusEnum.Syncing]: 'nodes.syncing',
  [NodeStatusEnum.Unknown]: 'nodes.unknown',
}
