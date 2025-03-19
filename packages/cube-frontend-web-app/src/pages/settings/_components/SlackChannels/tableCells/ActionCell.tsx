import { isEmpty } from 'lodash'
import { SlackChannelRow } from '../slackChannelsUtils'
import { SlackChannelRowError } from '../useSlackChannelRowsErrorMap'
import { EditingActionCallbacks, EditingActions } from './EditingActions'
import {
  NonEditingActionCallbacks,
  NonEditingActions,
} from './NonEditingActions'

export type ActionCellProps = {
  row: SlackChannelRow
  rowError: SlackChannelRowError | undefined
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

  return <NonEditingActions row={row} callbacks={nonEditingActions} />
}
