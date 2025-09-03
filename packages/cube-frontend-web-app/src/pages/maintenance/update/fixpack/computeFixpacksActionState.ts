import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFixpacksResponseDataFixpacksInner,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CephHealthStatus } from '../_components/useCephHealthStatus'

export type FixpackActionState = {
  install: InstallActionState | undefined
  rollback: RollbackActionState | undefined
  remove: RemoveActionState | undefined
}

export type InstallActionState =
  | 'available'
  | 'inProgress'
  | 'blockedByOlderFixpack'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type RollbackActionState =
  | 'available'
  | 'inProgress'
  | 'blockedByNewerFixpack'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type RemoveActionState =
  | 'available'
  | 'blockedByInstalling'
  | 'blockedByRollingBack'
  | 'blockedByAlreadyInstalled'

/**
 * @param fixpacks Fixpacks should be sorted by the order they were added in descending order.
 */
export const computeFixpacksActionState = (
  fixpacks: ListFixpacksResponseDataFixpacksInner[],
  cephHealthStatus: CephHealthStatus,
): FixpackActionState[] => {
  return fixpacks.map(
    (fixpack, index): FixpackActionState => ({
      install: computeInstallActionState(
        fixpack,
        fixpacks[index + 1],
        cephHealthStatus,
      ),
      rollback: computeRollbackActionState(
        fixpacks[index - 1],
        fixpack,
        cephHealthStatus,
      ),
      remove: computeRemoveActionState(fixpack),
    }),
  )
}

const computeInstallActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  olderFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  cephHealthStatus: CephHealthStatus,
): InstallActionState | undefined => {
  if (olderFixpack && olderFixpack.status.current !== StatusEnum.Installed) {
    return 'blockedByOlderFixpack'
  }

  if (fixpack.status.current === StatusEnum.Available) {
    if (cephHealthStatus === 'checking') return 'blockedByCheckingCephHealth'
    if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng)
      return 'blockedByUnhealthyCeph'
  }

  const currentStatusMap: Record<StatusEnum, InstallActionState | undefined> = {
    [StatusEnum.Available]: 'available',
    [StatusEnum.Installing]: 'inProgress',
    [StatusEnum.InstallFailed]: 'inProgress',
    [StatusEnum.Installed]: undefined,
    [StatusEnum.RollingBack]: undefined,
    [StatusEnum.RollbackFailed]: undefined,
  }

  return currentStatusMap[fixpack.status.current]
}

const computeRollbackActionState = (
  newerFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  fixpack: ListFixpacksResponseDataFixpacksInner,
  cephHealthStatus: CephHealthStatus,
): RollbackActionState | undefined => {
  if (
    fixpack.status.current === 'installed' &&
    !fixpack.status.isRollbackable
  ) {
    return undefined
  }

  if (newerFixpack && newerFixpack.status.current !== StatusEnum.Available) {
    return 'blockedByNewerFixpack'
  }

  if (fixpack.status.current === StatusEnum.Installed) {
    if (cephHealthStatus === 'checking') return 'blockedByCheckingCephHealth'
    if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng)
      return 'blockedByUnhealthyCeph'
  }

  const currentStatusMap: Record<StatusEnum, RollbackActionState | undefined> =
    {
      [StatusEnum.Available]: undefined,
      [StatusEnum.Installing]: undefined,
      [StatusEnum.InstallFailed]: undefined,
      [StatusEnum.Installed]: 'available',
      [StatusEnum.RollingBack]: 'inProgress',
      [StatusEnum.RollbackFailed]: 'inProgress',
    }

  return currentStatusMap[fixpack.status.current]
}

const computeRemoveActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
): RemoveActionState | undefined => {
  if (
    fixpack.status.current === 'installed' &&
    !fixpack.status.isRollbackable
  ) {
    return undefined
  }

  const currentStatusMap: Record<StatusEnum, RemoveActionState | undefined> = {
    [StatusEnum.Available]: 'available',
    [StatusEnum.Installing]: 'blockedByInstalling',
    [StatusEnum.InstallFailed]: 'blockedByInstalling',
    [StatusEnum.Installed]: 'blockedByAlreadyInstalled',
    [StatusEnum.RollingBack]: 'blockedByRollingBack',
    [StatusEnum.RollbackFailed]: 'blockedByRollingBack',
  }

  return currentStatusMap[fixpack.status.current]
}
