import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import { useMemo } from 'react'
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

  if (isRollbackable) {
    return {
      actionText: 'Yes, rollback',
      actionButtonProps: {
        loading: isRollbackButtonLoading,
      },
      onActionClick: onRollbackClick,
    }
  }

  if (isRollingBack) {
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
        // Disable the button because the fixpack is still rolling back.
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
