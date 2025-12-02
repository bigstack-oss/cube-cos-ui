import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
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

  const { t } = useTranslation()

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedByOlderFixpack) {
      return {
        message: t(
          'maintenance.update.fixpack.installTooltip.requirePriorVersions',
        ),
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message: t('maintenance.update.fixpack.installTooltip.unhealthyCeph'),
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
          {state === 'inProgress'
            ? t('maintenance.update.fixpack.installing')
            : t('maintenance.update.fixpack.install')}
        </CosButton>
      </span>
    </CosTooltip>
  )
}
