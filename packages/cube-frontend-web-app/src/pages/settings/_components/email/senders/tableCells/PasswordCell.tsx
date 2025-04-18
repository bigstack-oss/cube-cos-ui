import { CosTableInput, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { ChangeEvent } from 'react'
import { EmailSenderRow } from '../emailSendersUtils'

type PasswordCellProps = {
  row: EmailSenderRow
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const mask = '*'.repeat(10)

export const PasswordCell = (props: PasswordCellProps) => {
  const { row, onChange } = props

  const {
    password,
    isNew,
    isEditing,
    status: { isUpdating },
  } = row

  if (!isEditing) {
    if (isNew) {
      return ''
    }
    return mask
  }

  return (
    <div className="flex items-center gap-x-2">
      <CosTableInput
        name="password"
        type="password"
        className="w-32"
        value={password}
        hideErrorIcon={true}
        disabled={isUpdating}
        onChange={onChange}
      />
      {!isNew && (
        <CosTooltip
          hoverContent={{
            message: 'Enter a new password, or leave empty to clear it.',
          }}
        >
          <InformationCircle className="icon-md text-functional-text-light" />
        </CosTooltip>
      )}
    </div>
  )
}
