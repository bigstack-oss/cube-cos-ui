import { CosModal } from '@cube-frontend/ui-library'

export type EditConfirmModalProps = {
  isOpen: boolean
  isUpdating: boolean
  confirm: () => Promise<void>
  cancel: () => void
}

export const EditConfirmModal = (props: EditConfirmModalProps) => {
  const { isOpen, isUpdating, confirm, cancel } = props

  return (
    <CosModal
      isOpen={isOpen}
      title="Update the storage details"
      actionText="Yes, update"
      actionButtonProps={{ loading: isUpdating }}
      isCancelButtonVisible={!isUpdating}
      onActionClick={confirm}
      onCloseClick={cancel}
    >
      Please confirm you have re-uploaded the extra config file.
      <br />
      For security reasons, previously uploaded files are not retained when
      editing.
    </CosModal>
  )
}
