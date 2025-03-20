import { isEmpty } from 'lodash'
import { EmailSenderRow } from '../emailSendersUtils'
import { EmailSenderRowError } from '../useEmailSenderRowsErrorMap'
import { EditingActionCallbacks, EditingActions } from './EditingActions'
import {
  NonEditingActionCallbacks,
  NonEditingActions,
} from './NonEditingActions'

export type ActionCellProps = {
  row: EmailSenderRow
  rowError: EmailSenderRowError | undefined
  nonEditingActions: NonEditingActionCallbacks
  editingActions: EditingActionCallbacks
}

export const ActionCell = (props: ActionCellProps) => {
  const { row, rowError, nonEditingActions, editingActions } = props

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
      canVerify={isEmpty(rowError)}
      callbacks={nonEditingActions}
    />
  )
}
