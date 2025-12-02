import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { updatingStatuses } from '../../computeFirmwaresActionState'
import { AbortButton } from './AbortButton'
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

  const { t } = useTranslation()

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
    !!firmware?.status && updatingStatuses.has(firmware.status.current)

  const getTitle = (): string => {
    if (isUpdating)
      return t('maintenance.update.firmware.updateModal.firmwareUpdating')
    return t('maintenance.update.firmware.updateModal.firmwareUpdate')
  }

  const actionButtonProps = useUpdateFirmwareModalActionProps({
    firmware,
    isRollingChecked,
    isRollingApplied,
    progressRows,
    fetchUpdateProgress,
    onClose: onCloseClick,
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
          fetchUpdateProgress={fetchUpdateProgress}
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
      footerMessage={
        isUpdating &&
        progressRows.length > 0 && (
          <AbortButton
            firmwareVersion={firmware.version}
            onAborted={fetchUpdateProgress}
          />
        )
      }
    >
      {renderContent()}
    </CosModal>
  )
}
