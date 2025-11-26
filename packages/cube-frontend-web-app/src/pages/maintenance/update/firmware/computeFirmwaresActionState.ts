import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { CephHealthStatus } from '../_components/useCephHealthStatus'

export type FirmwareActionState = {
  update: UpdateActionState
  delete: DeleteActionState
}

type GenericActionState = 'hidden' | 'available'

export type UpdateActionState =
  | GenericActionState
  | 'inProgress'
  | 'blockedByOlderFirmware'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type DeleteActionState = GenericActionState | 'blockedByUpdating'

export const updatedStatuses = new Set<FirmwareStatus>([
  FirmwareStatus.Succeeded,
])

// TODO: Replace this with `firmware.status.isProcessing` after API is fixed.
export const updatingStatuses = new Set<FirmwareStatus>([
  FirmwareStatus.Installing,
  FirmwareStatus.WaitingReboot,
  FirmwareStatus.Rebooting,
  FirmwareStatus.Failed,
])

/**
 * @param firmwares Firmwares should be sorted by semantic-version in descending order.
 */
export const computeFirmwaresActionState = (
  firmwares: ListFirmwaresResponseDataFirmwaresInner[],
  cephHealthStatus: CephHealthStatus,
): FirmwareActionState[] => {
  return firmwares.map((firmware, i) => {
    const olderFirmware: ListFirmwaresResponseDataFirmwaresInner | undefined =
      firmwares[i + 1]

    return {
      update: computeUpdateActionState(
        firmware,
        olderFirmware,
        cephHealthStatus,
      ),
      delete: computeDeleteActionState(firmware),
    }
  })
}

const computeUpdateActionState = (
  firmware: ListFirmwaresResponseDataFirmwaresInner,
  olderFirmware: ListFirmwaresResponseDataFirmwaresInner | undefined,
  cephHealthStatus: CephHealthStatus,
): UpdateActionState => {
  const isInstalling = updatingStatuses.has(firmware.status.current)
  const isInstalled = updatedStatuses.has(firmware.status.current)

  if (isInstalling) return 'inProgress'

  if (isInstalled) return 'hidden'

  if (olderFirmware && !updatedStatuses.has(olderFirmware.status.current)) {
    return 'blockedByOlderFirmware'
  }

  if (cephHealthStatus === 'checking') {
    return 'blockedByCheckingCephHealth'
  }

  if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng) {
    return 'blockedByUnhealthyCeph'
  }

  return 'available'
}

const computeDeleteActionState = (
  firmware: ListFirmwaresResponseDataFirmwaresInner,
): DeleteActionState => {
  const isInstalled = updatedStatuses.has(firmware.status.current)
  const isInstalling = updatingStatuses.has(firmware.status.current)

  if (isInstalled) return 'hidden'

  if (isInstalling) return 'blockedByUpdating'

  return 'available'
}
