import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
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
import { useTranslation } from 'react-i18next'

type UseInstallFixpackModalActionButtonProps = Pick<
  CosModalProps,
  'actionText' | 'actionButtonProps' | 'isCancelButtonVisible' | 'onActionClick'
>

type UseInstallFixpackModalActionButtonPropsArgs = {
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined
  isInstallable: boolean
  selectedNodes: string[]
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
    isInstallable,
    selectedNodes,
    progressRows,
    isRollbackDisclaimerRead,
    onInstallationRequested,
    onSoftRebootRequested,
    onModalClose,
  } = args

  const { isInstallButtonLoading, onInstallClick } = useInstallFixpack(
    fixpack?.version,
    selectedNodes,
    onInstallationRequested,
  )

  const { isCallingSoftRebootDataCenterApi, onRebootClick } =
    useSoftRebootDataCenter(onSoftRebootRequested)

  const isInstalling = fixpack && isInstallingStatuses(fixpack.status.current)

  const isSoftRebooting = useMemo<boolean>(
    () => getIsSoftRebooting(fixpack, progressRows),
    [fixpack, progressRows],
  )

  const isReadyToReboot = useMemo<boolean>(() => {
    return getIsReadyToReboot(fixpack, progressRows)
  }, [fixpack, progressRows])

  const { t } = useTranslation()

  if (fixpack && isInstallable) {
    return {
      actionText: t('maintenance.update.fixpack.installModal.yesInstall'),
      actionButtonProps: {
        loading: isInstallButtonLoading,
        disabled:
          selectedNodes.length === 0 ||
          (!fixpack.status.isRollbackable && !isRollbackDisclaimerRead),
      },
      onActionClick: onInstallClick,
    }
  }

  if (isInstalling) {
    if (fixpack.rebootRequired) {
      return {
        actionText: t('maintenance.update.fixpack.installModal.rebootNow'),
        actionButtonProps: {
          loading: isCallingSoftRebootDataCenterApi,
          disabled: isSoftRebooting || !isReadyToReboot,
        },
        isCancelButtonVisible: false,
        onActionClick: onRebootClick,
      }
    }

    return {
      actionText: t('maintenance.update.fixpack.installModal.done'),
      actionButtonProps: {
        // Disable the button because the fixpack is still installing.
        disabled: true,
      },
      isCancelButtonVisible: false,
    }
  }

  return {
    actionText: t('maintenance.update.fixpack.installModal.close'),
    isCancelButtonVisible: false,
    onActionClick: onModalClose,
  }
}
