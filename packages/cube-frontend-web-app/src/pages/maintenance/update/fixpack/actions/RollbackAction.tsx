import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { RollbackActionState } from '../computeFixpacksActionState'

type RollbackActionProps = {
  state: Exclude<RollbackActionState, 'hidden'>
}

export const RollbackAction = (props: RollbackActionProps) => {
  const { state } = props

  const isBlockedBySelfRollbackability =
    state === 'blockedBySelfRollbackability'
  const isBlockedByNewerFixpack = state === 'blockedByNewerFixpack'
  const isBlockedByCheckingCephHealth = state === 'blockedByCheckingCephHealth'
  const isBlockedByUnhealthyCeph = state === 'blockedByUnhealthyCeph'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedBySelfRollbackability) {
      return {
        message: 'Rollback is not supported for this fixpack.',
      }
    }

    if (isBlockedByNewerFixpack) {
      return {
        message: 'Rollback is blocked by newer updates.',
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message: 'Rollback is currently unavailable because Ceph is unhealthy.',
      }
    }

    return undefined
  }

  const renderButton = () => {
    return (
      // Wrap the button with a <span> because the hover event doesn't work
      // when the button is disabled.
      <span>
        <CosButton
          type="ghost"
          disabled={
            isBlockedByNewerFixpack ||
            isBlockedByCheckingCephHealth ||
            isBlockedByUnhealthyCeph
          }
          onClick={(e) => e.stopPropagation()}
        >
          {state === 'inProgress' ? 'Rolling back' : 'Rollback'}
        </CosButton>
      </span>
    )
  }

  return (
    <CosTooltip hoverContent={getHoverTooltipContent()}>
      {isBlockedBySelfRollbackability ? (
        <div className="ml-auto mr-[10px]">
          <InformationCircle className="icon-md-sm text-functional-text" />
        </div>
      ) : (
        renderButton()
      )}
    </CosTooltip>
  )
}
