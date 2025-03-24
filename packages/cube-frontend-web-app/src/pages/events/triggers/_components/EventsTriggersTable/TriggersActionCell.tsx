import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'

const button = cva('icon-md text-functional-text', {
  variants: {
    disabled: { true: 'text-functional-disable-text' },
  },
})

type TriggersActionCellProps = {
  isLoading: boolean
  triggerName: string
  onEditClick: (triggerName: string) => void
  onDeleteClick: () => void
}

export const TriggersActionCell = (props: TriggersActionCellProps) => {
  const { triggerName, isLoading, onEditClick, onDeleteClick } = props

  const handleEditButtonClick = () => {
    onEditClick(triggerName)
  }

  const renderEditButton = () => {
    return (
      <button disabled={isLoading} onClick={handleEditButtonClick}>
        <EditIcon className={twMerge(button({ disabled: isLoading }))} />
      </button>
    )
  }

  const renderDeleteButton = () => {
    return (
      /**
       * The delete trigger function is not included in Phase 1,
       * so the button should either be disabled or removed (pending UI update).
       */
      <button disabled={true} onClick={onDeleteClick}>
        <DeleteIcon className={twMerge(button({ disabled: true }))} />
      </button>
    )
  }

  return (
    <div className="flex items-center gap-x-4">
      {renderEditButton()}
      {renderDeleteButton()}
    </div>
  )
}
