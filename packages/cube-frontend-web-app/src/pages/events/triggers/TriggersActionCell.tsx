import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { TriggerRow } from './utils'

const button = cva('icon-md text-functional-text', {
  variants: {
    disabled: { true: 'text-functional-disable-text' },
  },
})

type TriggersActionCellProps = {
  row: TriggerRow
  onEditClick: (triggerName: string) => void
}

export const TriggersActionCell = (props: TriggersActionCellProps) => {
  const { row, onEditClick } = props

  const {
    name,
    status: { isUpdating },
  } = row

  const handleEditButtonClick = () => {
    onEditClick(name)
  }

  const renderEditButton = () => {
    return (
      <button disabled={isUpdating} onClick={handleEditButtonClick}>
        <EditIcon className={twMerge(button({ disabled: isUpdating }))} />
      </button>
    )
  }

  const renderDeleteButton = () => {
    return (
      /**
       * The delete trigger function is not included in Phase 1,
       * so the button should be disabled.
       */
      <button disabled={true} onClick={() => {}}>
        <DeleteIcon className={twMerge(button({ disabled: true }))} />
      </button>
    )
  }

  return (
    <div className="flex items-center justify-end gap-x-4">
      {renderEditButton()}
      {renderDeleteButton()}
    </div>
  )
}
