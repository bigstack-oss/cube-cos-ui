import { Link } from 'react-router'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { noop } from 'lodash'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { TriggerRow } from '../utils'

const button = cva('icon-md text-functional-text', {
  variants: {
    disabled: { true: 'text-functional-disable-text' },
  },
})

type TriggersActionCellProps = {
  row: TriggerRow
}

export const TriggersActionCell = (props: TriggersActionCellProps) => {
  const { row } = props

  const renderEditButton = () => {
    const isProcessing = row.status?.current !== 'ok' || row.status.isProcessing

    const iconElement = (
      <EditIcon className={twMerge(button({ disabled: isProcessing }))} />
    )

    if (isProcessing) return iconElement

    return (
      <Link to={`${CosRoutesEnum.EVENTS_TRIGGERS_EDIT_PAGE}?name=${row.id}`}>
        {iconElement}
      </Link>
    )
  }

  const renderDeleteButton = () => {
    return (
      /**
       * TODO: implement delete triggers
       */
      <button disabled={true} onClick={noop}>
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
