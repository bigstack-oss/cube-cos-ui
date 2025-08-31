import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import { InstallActionState } from '../computeFixpacksActionState'

type InstallActionProps = {
  state: InstallActionState
}

export const InstallAction = (props: InstallActionProps) => {
  const { state } = props

  const isBlockedByOlderFixpack = state === 'blockedByOlderFixpack'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByOlderFixpack) {
      return {
        message:
          'Fixpack installation requires all prior versions to be installed.',
      }
    }

    return undefined
  }

  return (
    <CosTooltip hoverContent={getHoverTooltipContent()}>
      {/* Wrap the button with a <span> because the hover event doesn't work
      when the button is disabled. */}
      <span>
        <CosButton
          type="ghost"
          disabled={isBlockedByOlderFixpack}
          onClick={(e) => e.stopPropagation()}
        >
          {state === 'inProgress' ? 'Installing' : 'Install'}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
