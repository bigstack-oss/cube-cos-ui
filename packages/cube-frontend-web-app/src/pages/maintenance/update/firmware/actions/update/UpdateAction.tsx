import { MouseEvent } from 'react'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import { UpdateActionState } from '../../computeFirmwaresActionState'

type UpdateActionProps = {
  state: UpdateActionState
  onClick: () => void
}

export const UpdateAction = (props: UpdateActionProps) => {
  const { state, onClick: onClickProp } = props

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (state === 'inProgress') {
      return { message: 'Update is ongoing' }
    }

    if (state === 'blockedByCheckingCephHealth') {
      return { message: 'Update is blocked by checking Ceph health.' }
    }

    if (state === 'blockedByUnhealthyCeph') {
      return { message: 'Update is blocked because Ceph is unhealthy.' }
    }

    if (state === 'unavailable') {
      return { message: 'Update is unavailable for this firmware.' }
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
        <CosButton type="ghost" onClick={onClick}>
          Update
        </CosButton>
      </span>
    </CosTooltip>
  )
}
