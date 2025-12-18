import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'

type AddDiskModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onCloseClick: () => void
}

export const AddDiskModal = (props: AddDiskModalProps) => {
  const { nodeName, isOpen, targetRow, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: addDisk } = useCosMutationRequest(
    nodesApi.addNodeDevice,
  )

  const { t } = useTranslation()

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
      onCloseClick()
    } catch (error) {
      console.error('Add disk error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={t('nodes.details.devices.addDiskModal.title', {
        disk: targetRow?.device,
      })}
      actionText={t('nodes.details.devices.addDiskModal.add')}
      actionButtonProps={{
        loading: isLoading,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-[20px]">
        <p className="primary-body2 text-functional-text">
          <Trans
            i18nKey="nodes.details.devices.addDiskModal.message"
            values={{ disk: targetRow?.device }}
            components={{ bold: <span className="font-bold" /> }}
          />
        </p>
        {!!targetRow && (
          <DeviceTable rows={[targetRow]}>
            <DeviceTable.Column
              label={t('nodes.details.devices.device')}
              property="device"
              emphasize={true}
            />
            <DeviceTable.Column
              label={t('nodes.details.devices.serialNumber')}
              property="serial"
            />
            <DeviceTable.Column
              label={t('nodes.details.devices.size')}
              property="sizeMiB"
            >
              {(sizeMiB) => toReadableSizeString(sizeMiB, 'MiB')}
            </DeviceTable.Column>
          </DeviceTable>
        )}
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="nodes.details.devices.addDiskModal.footerMessage"
            values={{ disk: targetRow?.device }}
            components={{ bold: <span className="font-bold" /> }}
          />
        </div>
      </div>
    </CosModal>
  )
}
