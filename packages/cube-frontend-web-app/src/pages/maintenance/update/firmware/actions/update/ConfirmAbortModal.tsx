import { useContext, useState } from 'react'
import { CosModal } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { Trans, useTranslation } from 'react-i18next'

type ConfirmAbortModalProps = {
  isOpen: boolean
  firmwareVersion: string
  onAborted: () => unknown
  onCloseClick: () => void
}

export const ConfirmAbortModal = (props: ConfirmAbortModalProps) => {
  const { isOpen, firmwareVersion, onAborted, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const [isLoading, setIsLoading] = useState(false)

  const { mutateResource: abortFirmwareUpdate } = useCosMutationRequest(
    firmwaresApi.abortFirmwareUpdate,
  )

  const onClick = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await abortFirmwareUpdate({
        dataCenter: dataCenter!.name,
      })
      onAborted()
    } catch (error) {
      console.error('Failed to abort firmware update: ', error)
      setIsLoading(false)
    }
  }

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={t('maintenance.update.firmware.abortModal.title')}
      actionText={t('maintenance.update.firmware.abortModal.abort')}
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onClick}
      onCloseClick={onCloseClick}
    >
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.firmware.abortModal.message"
          values={{ firmware: firmwareVersion }}
          components={{ bold: <b className="font-semibold" /> }}
        />
      </div>
    </CosModal>
  )
}
