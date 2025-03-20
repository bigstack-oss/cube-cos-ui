import { CosTableInput, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { EmailSenderRow } from '../emailSendersUtils'

type PasswordCellProps = {
  row: EmailSenderRow
  errorMessage: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const mask = '*'.repeat(10)

export const PasswordCell = (props: PasswordCellProps) => {
  const { row, errorMessage, onChange } = props

  const { password, isNew, isEditing, isSaving } = row

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
        placeholder={isNew ? '' : mask}
        value={password}
        errorMessage={errorMessage}
        disabled={isSaving}
        onChange={onChange}
      />
      {!isNew && (
        <CosTooltip
          hoverContent={{
            message: 'Leave blank to keep your current password',
          }}
        >
          <InformationCircle
            className={twMerge(
              'icon-md text-functional-text-light',
              !errorMessage && '-ml-6',
            )}
          />
        </CosTooltip>
      )}
    </div>
  )
}
