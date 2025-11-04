import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import Trash from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { MouseEvent } from 'react'
import { DeleteActionState } from '../../computeFirmwaresActionState'

type DeleteActionProps = {
  state: DeleteActionState
  onClick: () => void
}

export const DeleteAction = (props: DeleteActionProps) => {
  const { state, onClick: onClickProp } = props

  const isBlockedByUpdating = state === 'blockedByUpdating'

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByUpdating) {
      return {
        message:
          'Removal is blocked because this firmware is currently being upgraded.',
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
          usage="icon-only"
          Icon={Trash}
          disabled={isBlockedByUpdating}
          onClick={onClick}
        />
      </span>
    </CosTooltip>
  )
}
