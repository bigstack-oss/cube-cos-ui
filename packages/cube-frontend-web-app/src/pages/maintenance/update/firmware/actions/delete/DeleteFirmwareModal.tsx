import { CosModal } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'

type DeleteFirmwareModalProps = {
  version: string | undefined
  onCloseClick: () => void
  onDeleted: () => void
}

export const DeleteFirmwareModal = (props: DeleteFirmwareModalProps) => {
  const { version, onCloseClick, onDeleted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: deleteFirmware } = useCosMutationRequest(
    firmwaresApi.deleteFirmware,
  )

  const { t } = useTranslation()

  const onDeleteClick = async (): Promise<void> => {
    if (!version) return

    try {
      await deleteFirmware({
        dataCenter: dataCenter!.name,
        version,
      })
      onDeleted()
    } catch (error) {
      console.error('Delete firmware error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={!!version}
      title={t('maintenance.update.firmware.deleteModal.title')}
      size="sm"
      actionText={t('maintenance.update.firmware.deleteModal.yesDelete')}
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onDeleteClick}
      onCloseClick={onCloseClick}
    >
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.firmware.deleteModal.message"
          values={{ firmware: version }}
          components={{ bold: <b className="font-semibold" /> }}
        />
      </div>
    </CosModal>
  )
}
