import Delete from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import Send from '@cube-frontend/ui-library/icons/monochrome/send.svg?react'
import { IconActionButton } from '../../../IconActionButton'
import { EmailRecipientRow } from '../emailRecipientsUtils'

type NonEditingActionsProps = {
  row: EmailRecipientRow
  hasVerifiedSender: boolean
  callbacks: NonEditingActionCallbacks
}

export type NonEditingActionCallbacks = {
  onEditClick: (rowId: string) => void
  onTryClick: (rowId: string) => Promise<void>
  onDeleteClick: (rowId: string) => void
}

export const NonEditingActions = (props: NonEditingActionsProps) => {
  const {
    row,
    hasVerifiedSender,
    callbacks: { onEditClick, onTryClick, onDeleteClick },
  } = props

  const { isTrying, isDeleting } = row

  return (
    <div className="flex items-center justify-end gap-x-4">
      <IconActionButton
        Icon={Edit}
        disabled={isTrying || isDeleting}
        onClick={() => onEditClick(row.id)}
      />
      <IconActionButton
        Icon={Send}
        isLoading={isTrying}
        hoverMessage={
          hasVerifiedSender
            ? 'Send test message'
            : 'A verified sender email is required to send the test message.'
        }
        disabled={!hasVerifiedSender || isDeleting}
        onClick={() => onTryClick(row.id)}
      />
      <IconActionButton
        Icon={Delete}
        isLoading={isDeleting}
        disabled={isTrying}
        onClick={() => onDeleteClick(row.id)}
      />
    </div>
  )
}
