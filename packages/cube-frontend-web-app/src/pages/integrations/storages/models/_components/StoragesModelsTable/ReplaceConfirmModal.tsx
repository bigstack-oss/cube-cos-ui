import { CosModal } from '@cube-frontend/ui-library'

export type ReplaceConfirmModalProps = {
  isOpen: boolean
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ReplaceConfirmModal = (props: ReplaceConfirmModalProps) => {
  const { isOpen, isLoading, onConfirm, onCancel } = props

  return (
    <CosModal
      isOpen={isOpen}
      title="Confirm to replace the model"
      actionText="Yes, Confirm"
      actionButtonProps={{ loading: isLoading }}
      isCancelButtonVisible={!isLoading}
      onActionClick={onConfirm}
      onCloseClick={onCancel}
    >
      Please note that applying this update may affect subsequent volume
      operations.
      <br />
      Verify all settings carefully before saving your changes.
    </CosModal>
  )
}
