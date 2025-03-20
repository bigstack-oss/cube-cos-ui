import { isEmpty } from 'lodash'
import { EmailRecipientRow } from '../emailRecipientsUtils'
import { EmailRecipientRowError } from '../useEmailRecipientRowsErrorMap'
import { EditingActionCallbacks, EditingActions } from './EditingActions'
import {
  NonEditingActionCallbacks,
  NonEditingActions,
} from './NonEditingActions'

export type ActionCellProps = {
  row: EmailRecipientRow
  rowError: EmailRecipientRowError | undefined
  hasVerifiedSender: boolean
  nonEditingActions: NonEditingActionCallbacks
  editingActions: EditingActionCallbacks
}

export const ActionCell = (props: ActionCellProps) => {
  const {
    row,
    rowError,
    hasVerifiedSender,
    nonEditingActions,
    editingActions,
  } = props

  if (row.isEditing) {
    return (
      <EditingActions
        row={row}
        canSave={isEmpty(rowError)}
        callbacks={editingActions}
      />
    )
  }

  return (
    <NonEditingActions
      row={row}
      hasVerifiedSender={hasVerifiedSender}
      callbacks={nonEditingActions}
    />
  )
}
