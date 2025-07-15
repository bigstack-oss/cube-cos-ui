import { CosModal } from '@cube-frontend/ui-library'
import { useState } from 'react'
import { DeviceRow } from './nodeDevicesUtils'
import { useDeviceActionToast } from './useDeviceActionToast'

type RestartOSDsModalProps = {
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const RestartOSDsModal = (props: RestartOSDsModalProps) => {
  const { isOpen, targetRow, onAccepted, onCloseClick } = props

  const [isLoading, setIsLoading] = useState(false)

  const { showSuccessToast, showFailedToast } = useDeviceActionToast()

  const onActionClick = async (): Promise<void> => {
    if (!targetRow) return

    setIsLoading(true)

    try {
      // TODO: Call restart OSD API for each OSD.
      setTimeout(() => {
        setIsLoading(false)
        onAccepted()
      }, 1000)

      setTimeout(() => {
        showSuccessToast('OSDs restartd successfully.', targetRow)
      }, 3000)
    } catch (error) {
      console.error('Restart OSDs error: ', error)
      showFailedToast('Failed to restart OSDs.', targetRow)
      setIsLoading(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title="Restart OSDs"
      actionText="Restart OSDs"
      actionButtonProps={{
        loading: isLoading,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <p className="primary-body2 text-functional-text">
        Do you want to restart OSDs?
      </p>
    </CosModal>
  )
}
