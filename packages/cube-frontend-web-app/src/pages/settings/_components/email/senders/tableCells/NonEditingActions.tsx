import { CosButton } from '@cube-frontend/ui-library'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import { IconActionButton } from '../../../IconActionButton'
import { EmailSenderRow } from '../emailSendersUtils'

type NonEditingActionsProps = {
  row: EmailSenderRow
  canVerify: boolean
  callbacks: NonEditingActionCallbacks
}

export type NonEditingActionCallbacks = {
  onEditClick: (rowId: string) => void
  onVerifyClick: (rowId: string) => void
}

export const NonEditingActions = (props: NonEditingActionsProps) => {
  const {
    row,
    canVerify,
    callbacks: { onEditClick, onVerifyClick },
  } = props

  const { isNew, accessVerified, isVerifying } = row

  return (
    <div className="flex items-center justify-end gap-x-4">
      <IconActionButton
        Icon={Edit}
        disabled={isVerifying}
        onClick={() => onEditClick(row.id)}
      />
      {!isNew && !accessVerified && (
        <CosButton
          type="secondary"
          size="sm"
          usage="text-only"
          loading={isVerifying}
          disabled={!canVerify}
          onClick={() => onVerifyClick(row.id)}
        >
          Verify
        </CosButton>
      )}
    </div>
  )
}
