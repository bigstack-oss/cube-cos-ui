import { Link } from 'react-router'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosTooltip } from '@cube-frontend/ui-library'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { TriggerRow } from '../utils'
import { useTranslation } from 'react-i18next'

const button = cva('icon-md text-functional-text', {
  variants: {
    disabled: { true: 'text-functional-disable-text' },
  },
})

type TriggersActionCellProps = {
  row: TriggerRow
  onDeleteClick: (rowId: string) => void
}

export const TriggersActionCell = (props: TriggersActionCellProps) => {
  const { row, onDeleteClick } = props

  const { name, isBuiltIn, status, isProcessing } = row

  const { t } = useTranslation()

  const isRowProcessing =
    status?.current !== 'ok' || status.isProcessing || isProcessing

  const renderEditButton = () => {
    const iconElement = (
      <EditIcon className={twMerge(button({ disabled: isRowProcessing }))} />
    )

    if (isRowProcessing) return iconElement

    return (
      <Link to={`${CosRoutesEnum.EVENTS_TRIGGERS_EDIT_PAGE}?name=${row.id}`}>
        {iconElement}
      </Link>
    )
  }

  const renderDeleteButton = () => {
    const disabled = isBuiltIn || isRowProcessing

    const deleteIcon = <DeleteIcon className={twMerge(button({ disabled }))} />

    if (isBuiltIn)
      return (
        <CosTooltip
          hoverContent={{
            message: t('events.triggers.deleteTooltip.builtInCannotBeDeleted'),
          }}
        >
          {deleteIcon}
        </CosTooltip>
      )

    return (
      <button disabled={disabled} onClick={() => onDeleteClick(name)}>
        {deleteIcon}
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
