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
  t: TFunction<'translation', undefined>,
  node?: Pick<Node, 'status' | 'uptimeSeconds'>,
): string => {
  if (node?.status !== NodeStatusEnum.Up) {
    return ''
  }
  return humanizeDuration(t, node.uptimeSeconds)
}

export const nodeStatusTranslationKeys: Record<NodeStatusEnum, ParseKeys> = {
  [NodeStatusEnum.Up]: 'home.overview.nodes.up',
  [NodeStatusEnum.Down]: 'home.overview.nodes.down',
  [NodeStatusEnum.PoweringOn]: 'home.overview.nodes.poweringOn',
  [NodeStatusEnum.PoweringOff]: 'home.overview.nodes.poweringOff',
  [NodeStatusEnum.PoweringCycle]: 'home.overview.nodes.poweringCycle',
  [NodeStatusEnum.Syncing]: 'home.overview.nodes.syncing',
  [NodeStatusEnum.Unknown]: 'home.overview.nodes.unknown',
}
