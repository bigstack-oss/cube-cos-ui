import { CosModal } from '@cube-frontend/ui-library'

export type RemoveConfirmModalProps = {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

export const RemoveConfirmModal = (props: RemoveConfirmModalProps) => {
  const { isOpen, onConfirm, onClose } = props

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title="Remove the Vendor-Model list?"
      actionText="Remove"
      onActionClick={onConfirm}
      onCloseClick={onClose}
    >
      <p className="primary-body2 text-functional-text">
        Do you want to remove this Vendor-Model list?
      </p>
    </CosModal>
  )
}
