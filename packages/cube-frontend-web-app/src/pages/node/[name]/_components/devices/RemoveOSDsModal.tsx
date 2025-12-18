import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { DeviceRow } from './nodeDevicesUtils'

type RemoveOSDsModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onCloseClick: () => void
}

export const RemoveOSDsModal = (props: RemoveOSDsModalProps) => {
  const { nodeName, isOpen, targetRow, onCloseClick } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const [isLoading, setIsLoading] = useState(false)

  const onActionClick = async (): Promise<void> => {
    if (!nodeName || !targetRow) return
    setIsLoading(true)
    try {
      const promises: Promise<unknown>[] = targetRow.osd.daemons.map((daemon) =>
        nodesApi.deleteNodeOsd({
          dataCenter: dataCenter!.name,
          nodeName,
          osdId: daemon.id,
        }),
      )
      await Promise.all(promises)
      setIsLoading(false)
      onCloseClick()
    } catch (error) {
      console.error('Remove OSDs error: ', error)
      setIsLoading(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={t('nodes.details.devices.removeOSDModal.title')}
      actionText={t('nodes.details.devices.removeOSDModal.removeOSDs')}
      actionButtonProps={{
        loading: isLoading,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <p className="primary-body2 text-functional-text">
        {t('nodes.details.devices.removeOSDModal.message')}
      </p>
    </CosModal>
  )
}
