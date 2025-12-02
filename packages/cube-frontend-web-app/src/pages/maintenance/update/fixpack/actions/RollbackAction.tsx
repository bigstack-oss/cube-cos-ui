import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { RollbackActionState } from '../computeFixpacksActionState'

type RollbackActionProps = {
  state: Exclude<RollbackActionState, 'hidden'>
  onClick: () => void
}

export const RollbackAction = (props: RollbackActionProps) => {
  const { state, onClick: onClickProp } = props

  const isBlockedBySelfRollbackability =
    state === 'blockedBySelfRollbackability'
  const isBlockedByNewerFixpack = state === 'blockedByNewerFixpack'
  const isBlockedByCheckingCephHealth = state === 'blockedByCheckingCephHealth'
  const isBlockedByUnhealthyCeph = state === 'blockedByUnhealthyCeph'

  const { t } = useTranslation()

  const getHoverTooltipContent = (): CosTooltipInformation | undefined => {
    if (isBlockedBySelfRollbackability) {
      return {
        message: t('maintenance.update.fixpack.rollbackTooltip.notSupported'),
      }
    }

    if (isBlockedByNewerFixpack) {
      return {
        message: t(
          'maintenance.update.fixpack.rollbackTooltip.blockedByNewerUpdates',
        ),
      }
    }

    if (isBlockedByUnhealthyCeph) {
      return {
        message: t('maintenance.update.fixpack.rollbackTooltip.unhealthyCeph'),
      }
    }

    return undefined
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onClickProp()
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
          onClick={handleClick}
        >
          {state === 'inProgress'
            ? t('maintenance.update.fixpack.rollingBack')
            : t('maintenance.update.fixpack.rollback')}
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
