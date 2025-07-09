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

  return (
    <CosModal
      isOpen={!!supportFiles}
      title="Delete Support File"
      size="sm"
      actionText="Yes, delete"
      actionButtonProps={{ loading: deleting }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      Are you sure you want to delete the support file?
    </CosModal>
  )
}
