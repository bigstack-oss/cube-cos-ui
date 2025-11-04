import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import { MouseEvent } from 'react'
import { UpdateActionState } from '../../computeFirmwaresActionState'

type UpdateActionProps = {
  state: UpdateActionState
  onClick: () => void
}

export const UpdateAction = (props: UpdateActionProps) => {
  const { state, onClick: onClickProp } = props

  const isInProgress = state === 'inProgress'
  const isBlockedByOlderFirmware = state === 'blockedByOlderFirmware'
  const isBlockedByCheckingCephHealth = state === 'blockedByCheckingCephHealth'
  const isBlockedByUnhealthyCeph = state === 'blockedByUnhealthyCeph'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByOlderFirmware) {
      return {
        message: 'Firmware update requires all prior versions to be updated.',
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message:
          'Firmware update is currently unavailable because Ceph is unhealthy.',
      }
    }

    return undefined
  }

  const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
    // Stop propagation because the table row is clickable.
    e.stopPropagation()
    onClickProp()
  }

  return (
    <CosTooltip hoverContent={getHoverTooltipContent()}>
      {/* Wrap the button with a <span> because the hover event doesn't work
      when the button is disabled. */}
      <span>
        <CosButton
          type="ghost"
          disabled={
            isBlockedByOlderFirmware ||
            isBlockedByCheckingCephHealth ||
            isBlockedByUnhealthyCeph
          }
          onClick={onClick}
        >
          {isInProgress ? 'Updating' : 'Update'}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
