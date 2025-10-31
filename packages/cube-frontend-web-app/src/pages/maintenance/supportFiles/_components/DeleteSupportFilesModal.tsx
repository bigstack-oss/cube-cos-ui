import { useTranslation } from 'react-i18next'
import { CosModal } from '@cube-frontend/ui-library'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'

export type DeleteSupportFilesModalProps = {
  supportFiles?: SupportFileRow | null
  deleting: boolean
  onActionClick: () => void
  onCloseClick: () => void
}

export const DeleteSupportFilesModal = (
  props: DeleteSupportFilesModalProps,
) => {
  const { supportFiles, deleting, onActionClick, onCloseClick } = props

  const { t } = useTranslation()

  return (
    <CosModal
      isOpen={!!supportFiles}
      title={t('maintenance.supportFiles.deleteModal.title')}
      size="sm"
      actionText={t('maintenance.supportFiles.deleteModal.yesDelete')}
      actionButtonProps={{ loading: deleting }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <p className="primary-body2 text-functional-text">
        {t('maintenance.supportFiles.deleteModal.message')}
      </p>
    </CosModal>
  )
}
