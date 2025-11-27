import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'
import { UseStorageTable } from '../../_components/useStorageTable'

type DeleteConfirmModalProps = {
  action: UseStorageTable['rowActions']['delete']
}

export const DeleteConfirmModal = (props: DeleteConfirmModalProps) => {
  const { action } = props

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={action.isConfirmModalOpen}
      size="sm"
      title={t('integrations.storages.deleteModal.title')}
      actionText={t('integrations.storages.deleteModal.remove')}
      actionButtonProps={{ loading: action.isRequesting }}
      onActionClick={action.confirm}
      onCloseClick={action.closeConfirmModal}
    >
      <p className="primary-body2 text-functional-text">
        {t('integrations.storages.deleteModal.message', {
          storageName: action.deleteTargetName,
        })}
      </p>
    </CosModal>
  )
}
