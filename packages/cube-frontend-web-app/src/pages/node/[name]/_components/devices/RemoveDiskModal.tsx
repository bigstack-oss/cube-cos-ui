import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CosModal, CosNagging } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { DaemonsInfo } from './DaemonsInfo'
import { DeviceRow, DeviceTable } from './nodeDevicesUtils'

type RemoveDiskModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onCloseClick: () => void
}

export const RemoveDiskModal = (props: RemoveDiskModalProps) => {
  const { nodeName, isOpen, targetRow, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: removeDisk } = useCosMutationRequest(
    nodesApi.removeNodeDevice,
  )

  const { t } = useTranslation()

  const onActionClick = async (): Promise<void> => {
    if (!nodeName || !targetRow) return
    try {
      await removeDisk({
        dataCenter: dataCenter!.name,
        nodeName,
        deviceName: targetRow.device,
      })
      onCloseClick()
    } catch (error) {
      console.error('Remove disk error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      className="min-w-[720px]"
      title={t('nodes.details.devices.removeDiskModal.title', {
        disk: targetRow?.device,
      })}
      actionText={t('nodes.details.devices.removeDiskModal.remove')}
      actionButtonProps={{
        loading: isLoading,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-[20px]">
        <p className="primary-body2 text-functional-text">
          <Trans
            i18nKey="nodes.details.devices.removeDiskModal.message"
            values={{ disk: targetRow?.device }}
            components={{ bold: <span className="font-bold" /> }}
          />
        </p>
        {!!targetRow && (
          <>
            <DeviceTable rows={[targetRow]}>
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.device')}
                property="device"
                emphasize={true}
              />
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.serialNumber')}
                property="serial"
              />
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.size')}
                property="sizeMiB"
              >
                {(sizeMiB) => (
                  <span className="whitespace-nowrap">
                    {toReadableSizeString(sizeMiB, 'MiB')}
                  </span>
                )}
              </DeviceTable.Column>
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.definedClass')}
                property="class"
              />
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.osdStatus')}
                property="osd"
              >
                {(osd) => <DaemonsInfo daemons={osd.daemons} />}
              </DeviceTable.Column>
              <DeviceTable.Column
                label={t('nodes.details.devices.removeDiskModal.osdNumber')}
                property="osd"
              >
                {(osd) => osd.daemons.length}
              </DeviceTable.Column>
            </DeviceTable>
            <div className="primary-body2 text-functional-text">
              <Trans
                i18nKey="nodes.details.devices.removeDiskModal.footerMessage"
                values={{ disk: targetRow?.device }}
                components={{ bold: <span className="font-bold" /> }}
              />
            </div>
            {targetRow.osd.pgs > 0 && (
              <CosNagging
                className="w-full"
                type="warning"
                variant="top"
                title={t(
                  'nodes.details.devices.removeDiskModal.footerNaggingTitle',
                  { pgCount: targetRow.osd.pgs.toLocaleString('en-US') },
                )}
                description={t(
                  'nodes.details.devices.removeDiskModal.footerNaggingMessage',
                )}
              />
            )}
          </>
        )}
      </div>
    </CosModal>
  )
}
