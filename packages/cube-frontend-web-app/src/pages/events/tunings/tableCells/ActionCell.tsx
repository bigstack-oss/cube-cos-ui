import {
  CosLoadingSpinner,
  CosToggle,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import ArrowRotateLeft from '@cube-frontend/ui-library/icons/monochrome/arrow_rotate_left_01.svg?react'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { TuningRow } from '../tuningsUtils'

export type ActionCellProps = {
  row: TuningRow
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

export const ActionCell = (props: ActionCellProps) => {
  const { row, onToggleChange, onResetClick } = props

  const {
    isModified,
    status: { isUpdating },
    isResetting,
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
      <Edit className={iconButton({ disabled: isUpdating || isResetting })} />
    )
    if (isUpdating || isResetting) {
      return iconElement
    }
    const queryString = `?hosts=${row.hosts.map(encodeURIComponent).join(',')}`
    return (
      <Link to={`/events/tunings/${row.name}?${queryString}`}>
        {iconElement}
      </Link>
    )
  }

  const renderResetButton = () => {
    if (!isModified) {
      return undefined
    }
    if (isResetting) {
      return <CosLoadingSpinner variant="dot45" />
    }
    return (
      <CosTooltip
        hoverContent={{
          message: 'Reset to default value',
        }}
      >
        <ArrowRotateLeft
          className={iconButton({ disabled: isUpdating })}
          onClick={onResetClick}
        />
      </CosTooltip>
    )
  }

  return (
    <div className="flex items-center gap-x-4">
      <CosTooltip hoverContent={toggleHoverContent}>
        {/* Wrap the toggle with a <span> because the hover event doesn't work
        when the toggle is disabled, but we still need it for the tooltip. */}
        <span>
          <CosToggle
            isOn={row.enabled}
            disabled={!isModified || isUpdating || isResetting}
            onChange={onToggleChange}
          />
        </span>
      </CosTooltip>
      {renderEditButton()}
      {renderResetButton()}
    </div>
  )
}
