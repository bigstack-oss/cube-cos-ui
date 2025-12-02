import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import Trash from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { RemoveActionState } from '../computeFixpacksActionState'

type RemoveActionProps = {
  state: Exclude<RemoveActionState, 'hidden'>
  onClick: () => void
}

export const RemoveAction = (props: RemoveActionProps) => {
  const { state, onClick: onClickProp } = props

  const isBlockedByInstalling = state === 'blockedByInstalling'
  const isBlockedByRollingBack = state === 'blockedByRollingBack'
  const isBlockedByNewerFixpack = state === 'blockedByNewerFixpack'
  const isBlockedByAlreadyInstalled = state === 'blockedByAlreadyInstalled'

  const { t } = useTranslation()

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByInstalling) {
      return {
        message: t(
          'maintenance.update.fixpack.removeTooltip.blockedByInstalling',
        ),
      }
    }

    if (isBlockedByRollingBack) {
      return {
        message: t(
          'maintenance.update.fixpack.removeTooltip.blockedByRollingBack',
        ),
      }
    }

    if (isBlockedByNewerFixpack) {
      return {
        message: t(
          'maintenance.update.fixpack.removeTooltip.blockedByNewerFixpack',
        ),
      }
    }

    if (isBlockedByAlreadyInstalled) {
      return {
        message: t(
          'maintenance.update.fixpack.removeTooltip.blockedByInstalled',
        ),
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
          disabled={
            isBlockedByInstalling ||
            isBlockedByRollingBack ||
            isBlockedByNewerFixpack ||
            isBlockedByAlreadyInstalled
          }
          onClick={onClick}
        />
      </span>
    </CosTooltip>
  )
}
