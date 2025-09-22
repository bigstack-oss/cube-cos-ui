import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum,
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
    firmware.status.current ===
    ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum.Updated
  )
    return 'hidden'

  if (firmware.status.isProcessing) return 'blockedByProcessing'

  return 'available'
}
