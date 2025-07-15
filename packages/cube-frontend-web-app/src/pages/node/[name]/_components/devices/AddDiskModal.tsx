import { CosModal } from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { useState } from 'react'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'
import { useDeviceActionToast } from './useDeviceActionToast'

type AddDiskModalProps = {
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const AddDiskModal = (props: AddDiskModalProps) => {
  const { isOpen, targetRow, onAccepted, onCloseClick } = props

  // TODO: Replace the mock loading state with the `useCosMutationRequest` hook.
  const [isAdding, setIsAdding] = useState(false)

  const { showSuccessToast, showFailedToast } = useDeviceActionToast()

  const onActionClick = async (): Promise<void> => {
    if (!targetRow) return

    setIsAdding(true)

    try {
      // TODO: Call add disk API.
      setTimeout(() => {
        setIsAdding(false)
        onAccepted()
      }, 1000)

      setTimeout(() => {
        showSuccessToast('Your device has been added.', targetRow)
      }, 3000)
    } catch (error) {
      console.error('Add disk error: ', error)
      showFailedToast('Failed to add disk.', targetRow)
      setIsAdding(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={`Add Disk ${targetRow?.device}`}
      actionText="Add"
      actionButtonProps={{
        loading: isAdding,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-[20px]">
        <p className="primary-body2 text-functional-text">
          Adding <span className="font-bold">{targetRow?.device}</span> may
          lower performance temporarily, reducing hard drive efficiency and
          potentially affecting the system’s overall performance.
        </p>
        {!!targetRow && (
          <DeviceTable rows={[targetRow]}>
            <DeviceTable.Column
              label="Device"
              property="device"
              emphasize={true}
            />
            <DeviceTable.Column label="Serial Number" property="serial" />
            <DeviceTable.Column label="Size" property="sizeMiB">
              {(sizeMiB) => toReadableSizeString(sizeMiB, 'MiB')}
            </DeviceTable.Column>
          </DeviceTable>
        )}
        <div className="primary-body2 text-functional-text">
          Do you want to add{' '}
          <span className="font-bold">{targetRow?.device}</span> to the pool?
        </div>
      </div>
    </CosModal>
  )
}
