import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'
import { upgradingStatuses } from '../../computeFirmwaresActionState'
import { FirmwareUpdatableNodes } from './FirmwareUpdatableNodes'
import { FirmwareUpdateProgress } from './FirmwareUpdateProgress'
import { useFirmwareUpdateProgress } from './useFirmwareUpdateProgress'
import { useUpdateFirmwareModalActionProps } from './useUpdateFirmwareModalActionProps'

type UpdateFirmwareModalProps = {
  firmware: ListFirmwaresResponseDataFirmwaresInner | undefined
  onCloseClick: () => void
}

export const UpdateFirmwareModal = (props: UpdateFirmwareModalProps) => {
  const { firmware, onCloseClick } = props

  const [isRollingChecked, setIsRollingChecked] = useState(false)

  const onIsRollingChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsRollingChecked(e.target.checked)
  }

  const {
    isLoadingProgress,
    isRollingApplied,
    progressRows,
    fetchUpdateProgress,
  } = useFirmwareUpdateProgress(firmware)

  // TODO: Replace this with `firmware.status.isUpdatable` after API is fixed.
  const isUpdatable = firmware?.status.current === FirmwareStatus.Available
  const isUpdating =
    !!firmware?.status && upgradingStatuses.has(firmware.status.current)

  const getTitle = (): string => {
    if (isUpdating) return 'Firmware Updating'
    return 'Firmware Update'
  }

  const actionButtonProps = useUpdateFirmwareModalActionProps({
    firmware,
    isRollingChecked,
    isRollingApplied,
    progressRows,
    fetchUpdateProgress,
    onDoneClick: onCloseClick,
  })

  const renderContent = () => {
    if (isUpdatable) {
      return (
        <FirmwareUpdatableNodes
          version={firmware.version}
          isRollingChecked={isRollingChecked}
          isRollingCheckboxDisabled={
            !!actionButtonProps.actionButtonProps?.loading
          }
          onIsRollingChange={onIsRollingChange}
        />
      )
    }

    if (isUpdating) {
      return (
        <FirmwareUpdateProgress
          firmware={firmware}
          isLoadingProgress={isLoadingProgress}
          isRollingApplied={isRollingApplied}
          progressRows={progressRows}
        />
      )
    }

    return null
  }

  return (
    <CosModal
      isOpen={!!firmware}
      title={getTitle()}
      onCloseClick={onCloseClick}
      {...actionButtonProps}
    >
      {renderContent()}
    </CosModal>
  )
}
