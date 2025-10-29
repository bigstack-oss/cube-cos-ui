import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  GetHealthsResponseDataOverallStatusCurrentEnum,
} from '@cube-frontend/api'
import { CephHealthStatus } from '../_components/useCephHealthStatus'
import { FirmwareRow } from './listFirmwaresUtils'

export type UpdateActionState =
  | 'available'
  | 'inProgress'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'
  | 'hidden'

export type DeleteActionState = 'available' | 'blockedByProcessing' | 'hidden'

// TODO: Replace this with `firmware.status.isProcessing` after API is fixed.
export const upgradingStatuses = new Set<FirmwareStatus>([
  FirmwareStatus.Installing,
  FirmwareStatus.WaitingReboot,
  FirmwareStatus.Rebooting,
  FirmwareStatus.Failed,
])

export const computeFirmwareUpdateActionState = (
  firmware: FirmwareRow,
  cephHealthStatus: CephHealthStatus,
): UpdateActionState => {
  if (firmware.status.isProcessing) return 'inProgress'

  if (!firmware.status.isUpdatable) return 'hidden'

  if (cephHealthStatus === 'checking') return 'blockedByCheckingCephHealth'

  if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng)
    return 'blockedByUnhealthyCeph'

  return 'available'
}

export const computeFirmwareDeleteActionState = (
  firmware: FirmwareRow,
): DeleteActionState => {
  if (
    firmware.status.current === FirmwareStatus.Resolved ||
    FirmwareStatus.Succeeded
  )
    return 'hidden'

  if (upgradingStatuses.has(firmware.status.current))
    return 'blockedByProcessing'

  return 'available'
}
