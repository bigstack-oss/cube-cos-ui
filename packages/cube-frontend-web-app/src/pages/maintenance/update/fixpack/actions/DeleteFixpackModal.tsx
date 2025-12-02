import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

type DeleteFixpackModalProps = {
  version: string | undefined
  onCloseClick: () => void
  onDeleted: () => void
}

export const DeleteFixpackModal = (props: DeleteFixpackModalProps) => {
  const { version, onCloseClick, onDeleted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: deleteFixpack } = useCosMutationRequest(
    fixpacksApi.deleteFixpack,
  )

  const onActionClick = async (): Promise<void> => {
    if (!version) return

    try {
      await deleteFixpack({
        dataCenter: dataCenter!.name,
        version,
      })
      onDeleted()
    } catch (error) {
      console.error('Delete fixpack error: ', error)
    }
  }

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={!!version}
      title={t('maintenance.update.fixpack.deleteModal.title')}
      size="sm"
      actionText={t('maintenance.update.fixpack.deleteModal.yesDelete')}
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <p className="primary-body2 text-functional-text">
        {t('maintenance.update.fixpack.deleteModal.message', {
          fixpack: version,
        })}
      </p>
    </CosModal>
  )
}
