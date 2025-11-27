import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'

export type ReplaceConfirmModalProps = {
  isOpen: boolean
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ReplaceConfirmModal = (props: ReplaceConfirmModalProps) => {
  const { isOpen, isLoading, onConfirm, onCancel } = props

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={isOpen}
      title={t('integrations.modelList.replaceConfirmModal.title')}
      actionText={t('integrations.modelList.replaceConfirmModal.yesConfirm')}
      actionButtonProps={{ loading: isLoading }}
      isCancelButtonVisible={!isLoading}
      onActionClick={onConfirm}
      onCloseClick={onCancel}
    >
      {t('integrations.modelList.replaceConfirmModal.message')}
    </CosModal>
  )
}
