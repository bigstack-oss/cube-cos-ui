import { Link } from 'react-router'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useEditTriggersStore } from '@cube-frontend/web-app/stores/editTriggersStore'
import { mockSpecificTrigger } from '@cube-frontend/web-app/components/UpsertTriggers/mockData'
import { TriggerRow } from '../utils'

const { setInitialData } = useEditTriggersStore.getState()

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
      <EditIcon className={twMerge(button({ disabled: row.isUpdating }))} />
    )

    if (row.isUpdating) {
      return iconElement
    }

    const onEditClick = (): void => {
      setInitialData(mockSpecificTrigger)
    }

    return (
      <Link to={CosRoutesEnum.EVENTS_TRIGGERS_EDIT_PAGE} onClick={onEditClick}>
        {iconElement}
      </Link>
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
