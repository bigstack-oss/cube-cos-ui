import {
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as FixpackStatus,
  ListFixpacksResponseDataFixpacksInner,
} from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import { useMemo } from 'react'
import {
  getIsReadyToReboot,
  getIsSoftRebooting,
  ProgressTableRow,
} from '../_components/fixpackUpdateUtils'
import { useSoftRebootDataCenter } from '../_components/useSoftRebootDataCenter'
import { useInstallFixpack } from './useInstallFixpack'
import { isInstallingStatuses } from '../computeFixpacksActionState'

type UseInstallFixpackModalActionButtonProps = Pick<
  CosModalProps,
  'actionText' | 'actionButtonProps' | 'isCancelButtonVisible' | 'onActionClick'
>

type UseInstallFixpackModalActionButtonPropsArgs = {
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined
  progressRows: ProgressTableRow[]
  isRollbackDisclaimerRead: boolean
  onInstallationRequested: () => unknown
  onSoftRebootRequested: () => unknown
  onModalClose: () => void
}

export const useInstallFixpackModalActionButtonProps = (
  args: UseInstallFixpackModalActionButtonPropsArgs,
): UseInstallFixpackModalActionButtonProps => {
  const {
    fixpack,
    progressRows,
    isRollbackDisclaimerRead,
    onInstallationRequested,
    onSoftRebootRequested,
    onModalClose,
  } = args

  const { isInstallButtonLoading, onInstallClick } = useInstallFixpack(
    fixpack?.version,
    onInstallationRequested,
  )

  const { isCallingSoftRebootDataCenterApi, onRebootClick } =
    useSoftRebootDataCenter(onSoftRebootRequested)

  const isInstallable = fixpack?.status.current === FixpackStatus.Available

  const isInstalling = fixpack && isInstallingStatuses(fixpack.status.current)

  const isSoftRebooting = useMemo<boolean>(
    () => getIsSoftRebooting(fixpack, progressRows),
    [fixpack, progressRows],
  )

  const isReadyToReboot = useMemo<boolean>(() => {
    return getIsReadyToReboot(fixpack, progressRows)
  }, [fixpack, progressRows])

  if (isInstallable) {
    return {
      actionText: 'Yes, install',
      actionButtonProps: {
        loading: isInstallButtonLoading,
        disabled: !fixpack.status.isRollbackable && !isRollbackDisclaimerRead,
      },
      onActionClick: onInstallClick,
    }
  }

  if (isInstalling) {
    if (fixpack.rebootRequired) {
      return {
        actionText: 'Reboot now',
        actionButtonProps: {
          loading: isCallingSoftRebootDataCenterApi,
          disabled: isSoftRebooting || !isReadyToReboot,
        },
        isCancelButtonVisible: false,
        onActionClick: onRebootClick,
      }
    }

    return {
      actionText: 'Done',
      actionButtonProps: {
        // Disable the button because the fixpack is still installing.
        disabled: true,
      },
      isCancelButtonVisible: false,
    }
  }

  return {
    actionText: 'Done',
    isCancelButtonVisible: false,
    onActionClick: onModalClose,
  }
}
