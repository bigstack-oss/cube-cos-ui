import { CosModal } from '@cube-frontend/ui-library'
import { UseStorageTable } from '../../_components/useStorageTable'

type DeleteConfirmModalProps = {
  action: UseStorageTable['rowActions']['delete']
}

export const DeleteConfirmModal = (props: DeleteConfirmModalProps) => {
  const { action } = props

  return (
    <CosModal
      isOpen={action.isConfirmModalOpen}
      size="sm"
      title="Delete the storage?"
      actionText="Remove"
      actionButtonProps={{ loading: action.isRequesting }}
      onActionClick={action.confirm}
      onCloseClick={action.closeConfirmModal}
    >
      <p className="primary-body2 text-functional-text">
        Do you want to delete {action.deleteTargetName} storage?
      </p>
    </CosModal>
  )
}
