import { CosModal } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { useContext } from 'react'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'

type AddDiskModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const AddDiskModal = (props: AddDiskModalProps) => {
  const { nodeName, isOpen, targetRow, onAccepted, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: addDisk } = useCosMutationRequest(
    nodesApi.addNodeDevice,
  )

  const onActionClick = async (): Promise<void> => {
    if (!nodeName || !targetRow) return
    try {
      await addDisk({
        dataCenter: dataCenter!.name,
        nodeName,
        addNodeDeviceRequest: {
          device: targetRow.device,
        },
      })
      onAccepted()
    } catch (error) {
      console.error('Add disk error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={`Add Disk ${targetRow?.device}`}
      actionText="Add"
      actionButtonProps={{
        loading: isLoading,
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
