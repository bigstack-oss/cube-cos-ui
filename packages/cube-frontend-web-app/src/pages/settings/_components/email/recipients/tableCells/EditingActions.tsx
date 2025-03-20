import { CosButton } from '@cube-frontend/ui-library'
import Close from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { EmailRecipientRow } from '../emailRecipientsUtils'

type EditingActionsProps = {
  row: EmailRecipientRow
  canSave: boolean
  callbacks: EditingActionCallbacks
}

export type EditingActionCallbacks = {
  onSaveClick: (rowId: string) => Promise<void>
  onCancelEditClick: (rowId: string) => void
}

export const EditingActions = (props: EditingActionsProps) => {
  const {
    row,
    canSave,
    callbacks: { onSaveClick, onCancelEditClick },
  } = props

  const { isSaving } = row

  return (
    <div className="flex items-center justify-end gap-x-2">
      <CosButton
        usage="text-only"
        loading={isSaving}
        disabled={!canSave}
        onClick={() => onSaveClick(row.id)}
      >
        Save
      </CosButton>
      <CosButton
        className="rounded-full text-functional-text"
        type="ghost"
        usage="icon-only"
        Icon={Close}
        disabled={isSaving}
        onClick={() => onCancelEditClick(row.id)}
      />
    </div>
  )
}
