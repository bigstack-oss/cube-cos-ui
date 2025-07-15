import { CosCheckbox, CosModal, CosNagging } from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { ChangeEvent, useState } from 'react'
import { DaemonsInfo } from './DaemonsInfo'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'
import { useDeviceActionToast } from './useDeviceActionToast'

type RemoveDiskModalProps = {
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const RemoveDiskModal = (props: RemoveDiskModalProps) => {
  const { isOpen, targetRow, onAccepted, onCloseClick } = props

  const [gracefulRemove, setGracefulRemove] = useState(false)

  // TODO: Replace the mock loading state with the `useCosMutationRequest` hook.
  const [isRemoving, setIsRemoving] = useState(false)

  const { showSuccessToast, showFailedToast } = useDeviceActionToast()

  const onGracefulRemoveChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGracefulRemove(e.target.checked)
  }

  const onActionClick = async (): Promise<void> => {
    if (!targetRow) return

    setIsRemoving(true)

    try {
      // TODO: Call remove disk API.
      setTimeout(() => {
        setIsRemoving(false)
        onAccepted()
      }, 1000)

      setTimeout(() => {
        showSuccessToast('Your device has been removed.', targetRow)
      }, 3000)
    } catch (error) {
      console.error('Remove disk error: ', error)
      showFailedToast('Failed to remove disk.', targetRow)
      setIsRemoving(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={`Remove Disk ${targetRow?.device}`}
      actionText="Remove"
      actionButtonProps={{
        loading: isRemoving,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-[20px]">
        <p className="primary-body2 text-functional-text">
          Removing <span className="font-bold">{targetRow?.device}</span> may
          lower performance temporarily, reducing hard drive efficiency and
          potentially affecting the system’s overall performance.
        </p>
        {!!targetRow && (
          <>
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
              <DeviceTable.Column label="Defined Class" property="class" />
              <DeviceTable.Column label="OSD Status" property="osd">
                {(osd) => <DaemonsInfo daemons={osd.daemons} />}
              </DeviceTable.Column>
              <DeviceTable.Column label="OSD Number" property="osd">
                {(osd) => osd.daemons.length}
              </DeviceTable.Column>
            </DeviceTable>
            <div className="primary-body2 text-functional-text">
              Do you want to remove{' '}
              <span className="font-bold">{targetRow?.device}</span> from the
              pool?
            </div>
            <CosCheckbox
              label="Wait for data migration before removing the disk."
              labelClassName="max-w-none"
              checked={gracefulRemove}
              onChange={onGracefulRemoveChange}
            />
            <CosNagging
              className="w-full"
              type="warning"
              variant="top"
              title={`There is still data in the disk (${targetRow.osd.pgs.toLocaleString('en-US')} pgs).`}
              description="Recommendation: set reweight to 0 and wait for data to be fully drained."
            />
          </>
        )}
      </div>
    </CosModal>
  )
}
