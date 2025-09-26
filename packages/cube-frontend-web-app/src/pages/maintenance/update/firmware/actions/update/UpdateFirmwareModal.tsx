import { ListFirmwaresResponseDataFirmwaresInner } from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'
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

  const isUpdatable = !!firmware?.status.isUpdatable
  const isUpdating = !!firmware?.status.isProcessing

  const getTitle = (): string => {
    if (isUpdating) return 'Firmware Updating'
    return 'Firmware Update'
  }

  const actionButtonProps = useUpdateFirmwareModalActionProps({
    firmware,
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
