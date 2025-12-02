import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import {
  getIsReadyToReboot,
  getIsSoftRebooting,
  ProgressTableRow,
} from '../_components/fixpackUpdateUtils'
import { useSoftRebootDataCenter } from '../_components/useSoftRebootDataCenter'
import { useRollbackFixpack } from './useRollbackFixpack'
import {
  isRollbackableFixpack,
  isRollingBackStatuses,
} from '../computeFixpacksActionState'

type UseRollbackFixpackModalActionButtonProps = Pick<
  CosModalProps,
  'actionText' | 'actionButtonProps' | 'isCancelButtonVisible' | 'onActionClick'
>

type UseRollbackFixpackModalActionButtonPropsArgs = {
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined
  progressRows: ProgressTableRow[]
  onRollbackRequested: () => unknown
  onSoftRebootRequested: () => unknown
  onModalClose: () => void
}

export const useRollbackFixpackModalActionButtonProps = (
  args: UseRollbackFixpackModalActionButtonPropsArgs,
): UseRollbackFixpackModalActionButtonProps => {
  const {
    fixpack,
    progressRows,
    onRollbackRequested,
    onSoftRebootRequested,
    onModalClose,
  } = args

  const { isRollbackButtonLoading, onRollbackClick } = useRollbackFixpack(
    fixpack?.version,
    onRollbackRequested,
  )

  const { isCallingSoftRebootDataCenterApi, onRebootClick } =
    useSoftRebootDataCenter(onSoftRebootRequested)

  const isRollbackable = !!fixpack && isRollbackableFixpack(fixpack)

  const isRollingBack =
    !!fixpack && isRollingBackStatuses(fixpack.status.current)

  const isSoftRebooting = useMemo<boolean>(
    () => getIsSoftRebooting(fixpack, progressRows),
    [fixpack, progressRows],
  )

  const isReadyToReboot = useMemo<boolean>(
    () => getIsReadyToReboot(fixpack, progressRows),
    [fixpack, progressRows],
  )

  const { t } = useTranslation()

  if (isRollbackable) {
    return {
      actionText: t('maintenance.update.fixpack.rollbackModal.yesRollback'),
      actionButtonProps: {
        loading: isRollbackButtonLoading,
      },
      onActionClick: onRollbackClick,
    }
  }

  if (isRollingBack) {
    if (fixpack.rebootRequired) {
      return {
        actionText: t('maintenance.update.fixpack.rollbackModal.rebootNow'),
        actionButtonProps: {
          loading: isCallingSoftRebootDataCenterApi,
          disabled: isSoftRebooting || !isReadyToReboot,
        },
        isCancelButtonVisible: false,
        onActionClick: onRebootClick,
      }
    }

    return {
      actionText: t('maintenance.update.fixpack.rollbackModal.done'),
      actionButtonProps: {
        // Disable the button because the fixpack is still rolling back.
        disabled: true,
      },
      isCancelButtonVisible: false,
    }
  }

  return {
    actionText: t('maintenance.update.fixpack.rollbackModal.done'),
    isCancelButtonVisible: false,
    onActionClick: onModalClose,
  }
}
