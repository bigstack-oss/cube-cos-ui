import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
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

  const isInProgress = state === 'inProgress'
  const isBlockedByOlderFirmware = state === 'blockedByOlderFirmware'
  const isBlockedByCheckingCephHealth = state === 'blockedByCheckingCephHealth'
  const isBlockedByUnhealthyCeph = state === 'blockedByUnhealthyCeph'

  const { t } = useTranslation()

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByOlderFirmware) {
      return {
        message: t(
          'maintenance.update.firmware.updateTooltip.requirePriorVersions',
        ),
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message: t('maintenance.update.firmware.updateTooltip.unhealthyCeph'),
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
          {isInProgress
            ? t('maintenance.update.firmware.updating')
            : t('maintenance.update.firmware.update')}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
