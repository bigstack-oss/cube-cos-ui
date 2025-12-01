import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFixpacksResponseDataFixpacksInner,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CephHealthStatus } from '../_components/useCephHealthStatus'

export type FixpackActionState = {
  install: InstallActionState
  rollback: RollbackActionState
  remove: RemoveActionState
}

type GenericActionState = 'hidden' | 'available'

export type InstallActionState =
  | GenericActionState
  | 'inProgress'
  | 'blockedByOlderFixpack'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type RollbackActionState =
  | GenericActionState
  | 'inProgress'
  | 'blockedBySelfRollbackability'
  | 'blockedByNewerFixpack'
  | 'blockedByCheckingCephHealth'
  | 'blockedByUnhealthyCeph'

export type RemoveActionState =
  | GenericActionState
  | 'blockedByInstalling'
  | 'blockedByRollingBack'
  | 'blockedByNewerFixpack'
  | 'blockedByAlreadyInstalled'

export const installingStatuses = new Set<StatusEnum>([
  StatusEnum.Installing,
  StatusEnum.InstallFailed,
  StatusEnum.WaitingRebootFromInstall,
  StatusEnum.RebootingFromInstall,
])

export const rollingBackStatuses = new Set<StatusEnum>([
  StatusEnum.RollingBack,
  StatusEnum.RollbackFailed,
  StatusEnum.WaitingRebootFromRollback,
  StatusEnum.RebootingFromRollback,
])

export const isInstallingStatuses = (status: StatusEnum): boolean => {
  return installingStatuses.has(status)
}

export const isRollingBackStatuses = (status: StatusEnum): boolean => {
  return rollingBackStatuses.has(status)
}

export const isRollbackableFixpack = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
): boolean => {
  return (
    fixpack.status.isRollbackable &&
    fixpack.status.current === StatusEnum.Installed
  )
}

/**
 * @param fixpacks Fixpacks should be sorted by the order they were added in descending order.
 */
export const computeFixpacksActionState = (
  fixpacks: ListFixpacksResponseDataFixpacksInner[],
  cephHealthStatus: CephHealthStatus,
): FixpackActionState[] => {
  const latestInstalledPermanentFixpackIndex =
    findLatestInstalledPermanentFixpackIndex(fixpacks)

  return fixpacks.map((fixpack, i) => {
    const newerFixpack: ListFixpacksResponseDataFixpacksInner | undefined =
      fixpacks[i - 1]
    const olderFixpack: ListFixpacksResponseDataFixpacksInner | undefined =
      fixpacks[i + 1]

    const hasNewerPermanentFixpackInstalled =
      latestInstalledPermanentFixpackIndex !== undefined &&
      latestInstalledPermanentFixpackIndex < i

    return {
      install: computeInstallActionState(
        fixpack,
        olderFixpack,
        cephHealthStatus,
      ),
      rollback: computeRollbackActionState(
        fixpack,
        newerFixpack,
        hasNewerPermanentFixpackInstalled,
        cephHealthStatus,
      ),
      remove: computeRemoveActionState(
        fixpack,
        newerFixpack,
        hasNewerPermanentFixpackInstalled,
      ),
    }
  })
}

const computeInstallActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  olderFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  cephHealthStatus: CephHealthStatus,
): InstallActionState => {
  const isInstalling = isInstallingStatuses(fixpack.status.current)

  if (isInstalling) return 'inProgress'

  const isRollingBack = isRollingBackStatuses(fixpack.status.current)

  if (isRollingBack || fixpack.status.current === StatusEnum.Installed) {
    return 'hidden'
  }

  if (olderFixpack && olderFixpack.status.current !== StatusEnum.Installed) {
    return 'blockedByOlderFixpack'
  }

  if (cephHealthStatus === 'checking') {
    return 'blockedByCheckingCephHealth'
  }

  if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng) {
    return 'blockedByUnhealthyCeph'
  }

  return 'available'
}

const computeRollbackActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  newerFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  hasNewerPermanentFixpackInstalled: boolean,
  cephHealthStatus: CephHealthStatus,
): RollbackActionState => {
  const isRollingBack = isRollingBackStatuses(fixpack.status.current)

  if (isRollingBack) return 'inProgress'

  if (
    fixpack.status.current !== StatusEnum.Installed ||
    hasNewerPermanentFixpackInstalled
  ) {
    return 'hidden'
  }

  if (!fixpack.status.isRollbackable) return 'blockedBySelfRollbackability'

  if (newerFixpack && newerFixpack.status.current !== StatusEnum.Available) {
    return 'blockedByNewerFixpack'
  }

  if (cephHealthStatus === 'checking') {
    return 'blockedByCheckingCephHealth'
  }

  if (cephHealthStatus === GetHealthsResponseDataOverallStatusCurrentEnum.Ng) {
    return 'blockedByUnhealthyCeph'
  }

  return 'available'
}

const findLatestInstalledPermanentFixpackIndex = (
  fixpacks: ListFixpacksResponseDataFixpacksInner[],
): number | undefined => {
  const index = fixpacks.findIndex(
    (fixpack) =>
      fixpack.status.current === StatusEnum.Installed &&
      !fixpack.status.isRollbackable,
  )
  return index >= 0 ? index : undefined
}

const computeRemoveActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  newerFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  hasNewerPermanentFixpackInstalled: boolean,
): RemoveActionState => {
  const isInstalled = fixpack.status.current === StatusEnum.Installed

  if (isInstalled && !fixpack.status.isRollbackable) return 'hidden'

  const isInstalling = isInstallingStatuses(fixpack.status.current)

  if (isInstalling) return 'blockedByInstalling'

  const isRollingBack = isRollingBackStatuses(fixpack.status.current)
  if (isRollingBack) return 'blockedByRollingBack'

  if (hasNewerPermanentFixpackInstalled) {
    return 'hidden'
  }

  if (newerFixpack && newerFixpack.status.current !== StatusEnum.Available) {
    return 'blockedByNewerFixpack'
  }

  if (fixpack.status.current === StatusEnum.Installed) {
    return fixpack.status.isRollbackable
      ? 'blockedByAlreadyInstalled'
      : 'hidden'
  }

  return 'available'
}
