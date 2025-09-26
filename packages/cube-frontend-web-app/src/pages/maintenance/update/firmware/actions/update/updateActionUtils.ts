import {
  GetFirmwareUpgradeProgressResponseDataProgressesInner,
  ListFirmwareUpdatableNodesResponseDataInner,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type UpdatableNodeRow = ListFirmwareUpdatableNodesResponseDataInner &
  CosTableRow

export const toUpdatableNodeRow = (
  node: ListFirmwareUpdatableNodesResponseDataInner,
): UpdatableNodeRow => ({
  ...node,
  id: node.name,
})

export type UpdateProgressRow =
  GetFirmwareUpgradeProgressResponseDataProgressesInner & CosTableRow

export const toProgressRow = (
  progress: GetFirmwareUpgradeProgressResponseDataProgressesInner,
): UpdateProgressRow => ({
  ...progress,
  id: progress.host,
})
