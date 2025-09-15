import { GetHealthsResponseDataOverallStatusCurrentEnum } from '@cube-frontend/api'
import { CephHealthStatus } from '../_components/useCephHealthStatus'
import { FirmwareRow } from './listFirmwaresUtils'

export type UpdateActionState =
  | 'available'
  | 'unavailable'
  | 'inProgress'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type DeleteActionState =
  | 'available'
  | 'unavailable'
  | 'inProgress'
  | 'blockedByUpdated'

export const computeFirmwareUpdateActionState = (
  firmware: FirmwareRow,
  cephHealthStatus: CephHealthStatus,
): UpdateActionState => {
  const isProcessing =
    firmware.status.current === 'processing' || firmware.status.isProcessing

  if (isProcessing) return 'inProgress'

  if (cephHealthStatus === 'checking') return 'blockedByCheckingCephHealth'

  if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng)
    return 'blockedByUnhealthyCeph'

  if (!firmware.status.isUpdatable) return 'unavailable'

  return 'available'
}

export const computeFirmwareDeleteActionState = (firmware: FirmwareRow) => {
  const isProcessing =
    firmware.status.current === 'processing' || firmware.status.isProcessing

  if (isProcessing) return 'inProgress'

  if (firmware.status.current === 'updated') return 'blockedByUpdated'

  if (!firmware.status.isRemovable) return 'unavailable'

  return 'available'
}
