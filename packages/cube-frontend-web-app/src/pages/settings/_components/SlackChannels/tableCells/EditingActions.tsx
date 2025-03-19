import { CosButton } from '@cube-frontend/ui-library'
import Close from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { SlackChannelRow } from '../slackChannelsUtils'

type EditingActionsProps = {
  row: SlackChannelRow
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

  return (
    <div className="flex items-center justify-end gap-x-2">
      <CosButton
        usage="text-only"
        loading={row.isSaving}
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
        disabled={row.isSaving}
        onClick={() => onCancelEditClick(row.id)}
      />
    </div>
  )
}
