import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'

export type RemoveConfirmModalProps = {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

export const RemoveConfirmModal = (props: RemoveConfirmModalProps) => {
  const { isOpen, onConfirm, onClose } = props

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title={t('integrations.modelList.removeConfirmModal.title')}
      actionText={t('integrations.modelList.removeConfirmModal.remove')}
      onActionClick={onConfirm}
      onCloseClick={onClose}
    >
      <p className="primary-body2 text-functional-text">
        {t('integrations.modelList.removeConfirmModal.message')}
      </p>
    </CosModal>
  )
}
