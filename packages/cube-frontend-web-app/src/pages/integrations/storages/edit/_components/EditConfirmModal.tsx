import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'

export type EditConfirmModalProps = {
  isOpen: boolean
  isUpdating: boolean
  confirm: () => Promise<void>
  cancel: () => void
}

export const EditConfirmModal = (props: EditConfirmModalProps) => {
  const { isOpen, isUpdating, confirm, cancel } = props

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={isOpen}
      title={t('integrations.storages.upsert.editConfirmModal.title')}
      actionText={t('integrations.storages.upsert.editConfirmModal.yesUpdate')}
      actionButtonProps={{ loading: isUpdating }}
      isCancelButtonVisible={!isUpdating}
      onActionClick={confirm}
      onCloseClick={cancel}
    >
      <p className="whitespace-pre-wrap">
        {t('integrations.storages.upsert.editConfirmModal.message')}
      </p>
    </CosModal>
  )
}
