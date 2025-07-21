import { CosModal, CosNagging } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { useContext } from 'react'
import { DaemonsInfo } from './DaemonsInfo'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'

type RemoveDiskModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const RemoveDiskModal = (props: RemoveDiskModalProps) => {
  const { nodeName, isOpen, targetRow, onAccepted, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: removeDisk } = useCosMutationRequest(
    nodesApi.removeNodeDevice,
  )

  const onActionClick = async (): Promise<void> => {
    if (!nodeName || !targetRow) return
    try {
      await removeDisk({
        dataCenter: dataCenter!.name,
        nodeName,
        deviceName: targetRow.device,
      })
      onAccepted()
    } catch (error) {
      console.error('Remove disk error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      className="min-w-[720px]"
      title={`Remove Disk ${targetRow?.device}`}
      actionText="Remove"
      actionButtonProps={{
        loading: isLoading,
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
                {(sizeMiB) => (
                  <span className="whitespace-nowrap">
                    {toReadableSizeString(sizeMiB, 'MiB')}
                  </span>
                )}
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
            {targetRow.osd.pgs > 0 && (
              <CosNagging
                className="w-full"
                type="warning"
                variant="top"
                title={`There is still data in the disk (${targetRow.osd.pgs.toLocaleString('en-US')} pgs).`}
                description="Recommendation: set reweight to 0 and wait for data to be fully drained."
              />
            )}
          </>
        )}
      </div>
    </CosModal>
  )
}
