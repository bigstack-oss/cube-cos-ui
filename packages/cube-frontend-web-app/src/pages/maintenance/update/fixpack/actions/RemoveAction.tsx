import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import Trash from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { RemoveActionState } from '../computeFixpacksActionState'

type RemoveActionProps = {
  state: RemoveActionState
}

export const RemoveAction = (props: RemoveActionProps) => {
  const { state } = props

  const isBlockedByInstalling = state === 'blockedByInstalling'
  const isBlockedByRollingBack = state === 'blockedByRollingBack'
  const isBlockedByAlreadyInstalled = state === 'blockedByAlreadyInstalled'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    let message: string = ''

    if (isBlockedByInstalling) {
      message = 'The fixpack is currently being installed.'
    }

    if (isBlockedByRollingBack) {
      message = 'The fixpack is currently being rolled back.'
    }

    if (isBlockedByAlreadyInstalled) {
      message = "The fixpack can only be removed after it's been rolled back."
    }

    if (message) {
      return { message }
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
          usage="icon-only"
          Icon={Trash}
          disabled={
            isBlockedByInstalling ||
            isBlockedByRollingBack ||
            isBlockedByAlreadyInstalled
          }
          onClick={(e) => e.stopPropagation()}
        />
      </span>
    </CosTooltip>
  )
}
