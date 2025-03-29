import {
  CosToggle,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import ArrowRotateLeft from '@cube-frontend/ui-library/icons/monochrome/arrow_rotate_left_01.svg?react'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import { IconActionButton } from '@cube-frontend/web-app/components/IconActionButton/IconActionButton'
import {
  EditTuningsDefaultData,
  useEditTuningsStore,
} from '@cube-frontend/web-app/stores/editTuningsStore'
import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { TuningRow } from '../../tuningsUtils'

const { setDefaultData } = useEditTuningsStore.getState()

export type ActionCellProps = {
  row: TuningRow
  saveSpaceForResetButton: boolean
  onToggleChange: (enabled: boolean) => Promise<void>
  onResetClick: () => void
}

const iconButton = cva('icon-md', {
  variants: {
    disabled: {
      true: 'text-functional-disable-text',
      false: 'cursor-pointer text-functional-text',
    },
  },
})

const computeEditDefaultData = (row: TuningRow): EditTuningsDefaultData => {
  if (row.isModified) {
    return {
      specName: row.name,
      value: row.value,
      hosts: row.hosts.map((host) => host.name),
    }
  }
  return {
    specName: row.name,
  }
}

export const ActionCell = (props: ActionCellProps) => {
  const { row, saveSpaceForResetButton, onToggleChange, onResetClick } = props

  const {
    isModified,
    status: { isUpdating },
  } = row

  const toggleHoverContent = useMemo<CosTooltipInformation | undefined>(() => {
    if (isModified) {
      return undefined
    }
    return {
      message: 'Default key is not allowed to turn off.',
    }
  }, [isModified])

  const renderEditButton = () => {
    const iconElement = (
      <Edit className={iconButton({ disabled: isUpdating })} />
    )

    if (isUpdating) {
      return iconElement
    }

    const onEditClick = (): void => {
      setDefaultData(computeEditDefaultData(row))
    }

    return (
      <Link to="/events/tunings/edit" onClick={onEditClick}>
        {iconElement}
      </Link>
    )
  }

  const renderResetButton = () => {
    if (isModified) {
      return (
        <IconActionButton
          Icon={ArrowRotateLeft}
          hoverMessage="Reset to default value"
          disabled={isUpdating}
          onClick={onResetClick}
        />
      )
    }

    if (saveSpaceForResetButton) {
      return <span className="icon-md" />
    }

    return undefined
  }

  return (
    <div className="flex items-center justify-end gap-x-4">
      <CosTooltip hoverContent={toggleHoverContent}>
        {/* Wrap the toggle with a <span> because the hover event doesn't work
        when the toggle is disabled, but we still need it for the tooltip. */}
        <span>
          <CosToggle
            isOn={row.enabled}
            disabled={!isModified || isUpdating}
            onChange={onToggleChange}
          />
        </span>
      </CosTooltip>
      {renderEditButton()}
      {renderResetButton()}
    </div>
  )
}
