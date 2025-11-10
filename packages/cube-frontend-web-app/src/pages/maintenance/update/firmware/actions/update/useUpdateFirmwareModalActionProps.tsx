import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import { UpdateProgressRow } from './updateActionUtils'
import { useAvailableFirmwareUpdateModalActionProps } from './useAvailableFirmwareUpdateModalActionProps'
import { useUpdatingFirmwareUpdateModalActionProps } from './useUpdatingFirmwareUpdateModalActionProps'

export type UpdateFirmwareModalActionProps = Pick<
  CosModalProps,
  'actionText' | 'actionButtonProps' | 'isCancelButtonVisible' | 'onActionClick'
>

type UseUpdateFirmwareModalActionPropsArgs = {
  firmware: ListFirmwaresResponseDataFirmwaresInner | undefined
  isRollingChecked: boolean
  isRollingApplied: boolean
  progressRows: UpdateProgressRow[]
  fetchUpdateProgress: () => Promise<unknown>
  onClose: () => void
}

export const useUpdateFirmwareModalActionProps = (
  args: UseUpdateFirmwareModalActionPropsArgs,
): UpdateFirmwareModalActionProps => {
  const {
    firmware,
    isRollingChecked,
    isRollingApplied,
    progressRows,
    fetchUpdateProgress,
    onClose,
  } = args

  const availableModalActionProps = useAvailableFirmwareUpdateModalActionProps({
    firmware,
    isRollingChecked,
  })

  const updatingModalActionProps = useUpdatingFirmwareUpdateModalActionProps({
    isRollingApplied,
    progressRows,
    onRebootRequested: fetchUpdateProgress,
  })

  const updatedModalActionProps = {
    actionText: 'Done',
    onActionClick: onClose,
    isCancelButtonVisible: false,
  }

  if (!firmware) {
    return {
      actionText: 'Yes, update',
      actionButtonProps: {
        disabled: true,
      },
    }
  }

  const resultMap: Record<FirmwareStatus, UpdateFirmwareModalActionProps> = {
    available: availableModalActionProps,
    installing: updatingModalActionProps,
    'waiting reboot': updatingModalActionProps,
    rebooting: updatingModalActionProps,
    failed: updatingModalActionProps,
    resolved: updatedModalActionProps,
    succeeded: updatedModalActionProps,
  }

  return resultMap[firmware.status.current]
}
