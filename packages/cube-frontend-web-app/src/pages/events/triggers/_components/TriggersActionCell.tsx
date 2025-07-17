import { Link } from 'react-router'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { TriggerRow } from '../utils'
import { noop } from 'lodash'

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
    const iconElement = (
      <EditIcon
        className={twMerge(button({ disabled: row.status.isUpdating }))}
      />
    )

    if (row.status.isUpdating) {
      return iconElement
    }

    return (
      /**
       * TODO: implement edit triggers
       */
      <Link to={CosRoutesEnum.EVENTS_TRIGGERS_EDIT_PAGE}>{iconElement}</Link>
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
