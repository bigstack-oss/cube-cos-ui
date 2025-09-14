import { CosButton } from '@cube-frontend/ui-library'

export type FooterProps = {
  isSaving: boolean
  submitButtonText: string
  isSubmitDisabled: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const Footer = (props: FooterProps) => {
  const { onConfirm, onCancel, isSaving, submitButtonText, isSubmitDisabled } =
    props

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-4">
        <CosButton
          type="primary"
          onClick={onConfirm}
          loading={isSaving}
          disabled={isSubmitDisabled}
        >
          {submitButtonText}
        </CosButton>
        <CosButton type="ghost" onClick={onCancel}>
          Cancel
        </CosButton>
      </div>
    </div>
  )
}
