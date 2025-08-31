import {
  ListFixpacksResponseDataFixpacksInner,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'

export type FixpackActionState = {
  install: InstallActionState | undefined
  rollback: RollbackActionState | undefined
  remove: RemoveActionState | undefined
}

export type InstallActionState =
  | 'available'
  | 'inProgress'
  | 'blockedByOlderFixpack'

export type RollbackActionState =
  | 'available'
  | 'inProgress'
  | 'blockedByNewerFixpack'

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
): FixpackActionState[] => {
  return fixpacks.map(
    (fixpack, index): FixpackActionState => ({
      install: computeInstallActionState(fixpack, fixpacks[index + 1]),
      rollback: computeRollbackActionState(fixpacks[index - 1], fixpack),
      remove: computeRemoveActionState(fixpack),
    }),
  )
}

const computeInstallActionState = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  olderFixpack: ListFixpacksResponseDataFixpacksInner | undefined,
): InstallActionState | undefined => {
  if (olderFixpack && olderFixpack.status.current !== StatusEnum.Installed) {
    return 'blockedByOlderFixpack'
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
