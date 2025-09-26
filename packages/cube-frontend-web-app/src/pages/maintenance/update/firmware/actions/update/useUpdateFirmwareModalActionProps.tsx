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
  isRollingApplied: boolean
  progressRows: UpdateProgressRow[]
  fetchUpdateProgress: () => Promise<unknown>
  onDoneClick: () => void
}

export const useUpdateFirmwareModalActionProps = (
  args: UseUpdateFirmwareModalActionPropsArgs,
): UpdateFirmwareModalActionProps => {
  const {
    firmware,
    isRollingApplied,
    progressRows,
    fetchUpdateProgress,
    onDoneClick,
  } = args

  const availableModalActionProps = useAvailableFirmwareUpdateModalActionProps({
    version: firmware?.version,
    onUpdateRequested: fetchUpdateProgress,
  })

  const updatingModalActionProps = useUpdatingFirmwareUpdateModalActionProps({
    isRollingApplied,
    progressRows,
    onRebootRequested: fetchUpdateProgress,
  })

  const updatedModalActionProps = {
    actionText: 'Done',
    onActionClick: onDoneClick,
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
    processing: updatingModalActionProps,
    failed: updatingModalActionProps,
    updated: updatedModalActionProps,
  }

  return resultMap[firmware.status.current]
}
