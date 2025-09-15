import {
  GetFirmwareUpgradeProgressResponseDataProgressesInner,
  ListFirmwareUpdatableNodesResponseDataInner,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type UpdatableNodeRow = ListFirmwareUpdatableNodesResponseDataInner &
  CosTableRow

export type UpgradeProgressRow =
  GetFirmwareUpgradeProgressResponseDataProgressesInner & CosTableRow

export type UpdateModalStep =
  | 'updatableNodes'
  | 'rollingUpdating'
  | 'nonRollingUpdating'
  | 'rebootCluster'
