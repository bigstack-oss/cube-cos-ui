import {
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as FixpackStatus,
  ListFixpacksResponseDataFixpacksInner,
  GetFixpackUpdateProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus,
} from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import { useMemo } from 'react'
import { ProgressTableRow } from '../_components/fixpackUpdateUtils'
import { useSoftRebootDataCenter } from '../_components/useSoftRebootDataCenter'
import { useInstallFixpack } from './useInstallFixpack'

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

  const isInstalling =
    fixpack?.status.current === FixpackStatus.Installing ||
    fixpack?.status.current === FixpackStatus.InstallFailed

  const isSoftRebooting = useMemo<boolean>(() => {
    return (
      !!fixpack?.rebootRequired &&
      progressRows.length > 0 &&
      progressRows.some(
        (row) => row.status.current === ProgressStatus.Rebooting,
      )
    )
  }, [fixpack?.rebootRequired, progressRows])

  const isReadyToReboot = useMemo<boolean>(() => {
    return (
      !!fixpack?.rebootRequired &&
      progressRows.length > 0 &&
      progressRows.every(
        (row) => row.status.current === ProgressStatus.WaitingReboot,
      )
    )
  }, [fixpack?.rebootRequired, progressRows])

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
