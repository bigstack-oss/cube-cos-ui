import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import { MouseEvent } from 'react'
import { InstallActionState } from '../computeFixpacksActionState'

type InstallActionProps = {
  state: Exclude<InstallActionState, 'hidden'>
  onClick: () => void
}

export const InstallAction = (props: InstallActionProps) => {
  const { state, onClick: onClickProp } = props

  const isBlockedByOlderFixpack = state === 'blockedByOlderFixpack'
  const isBlockedByCheckingCephHealth = state === 'blockedByCheckingCephHealth'
  const isBlockedByUnhealthyCeph = state === 'blockedByUnhealthyCeph'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByOlderFixpack) {
      return {
        message:
          'Fixpack installation requires all prior versions to be installed.',
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message:
          'Fixpack installation is currently unavailable because Ceph is unhealthy.',
      }
    }

    return undefined
  }

  const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
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
            isBlockedByOlderFixpack ||
            isBlockedByCheckingCephHealth ||
            isBlockedByUnhealthyCeph
          }
          onClick={onClick}
        >
          {state === 'inProgress' ? 'Installing' : 'Install'}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
