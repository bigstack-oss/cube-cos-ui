import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import { RollbackActionState } from '../computeFixpacksActionState'

type RollbackActionProps = {
  state: RollbackActionState
}

export const RollbackAction = (props: RollbackActionProps) => {
  const { state } = props

  const isBlockedByNewerFixpack = state === 'blockedByNewerFixpack'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByNewerFixpack) {
      return {
        message: 'Rollback is blocked by newer updates.',
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
          disabled={isBlockedByNewerFixpack}
          onClick={(e) => e.stopPropagation()}
        >
          {state === 'inProgress' ? 'Rolling back' : 'Rollback'}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
