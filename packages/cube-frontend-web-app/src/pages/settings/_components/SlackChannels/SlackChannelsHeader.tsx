import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export type SlackChannelsHeaderProps = {
  isCountLimitReached: boolean
  isRowsLoading: boolean
  onAddButtonClick: () => void
}

export const SlackChannelsHeader = (props: SlackChannelsHeaderProps) => {
  const { isCountLimitReached, isRowsLoading, onAddButtonClick } = props

  const { t } = useTranslation()

  const getHoverInfo = (): CosTooltipInformation | undefined => {
    if (!isCountLimitReached) {
      return undefined
    }
    return {
      message: t('settings.slackChannels.limitReachedTooltip', { count: 10 }),
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="secondary-h5 text-functional-title">
        {t('settings.slackChannels.title')}
      </div>
      <CosTooltip hoverContent={getHoverInfo()}>
        {/* Wrap the button with a <span> because the hover event doesn't work
        when the button is disabled, but we still need it for the tooltip. */}
        <span>
          <CosButton
            type="secondary"
            usage="icon-left"
            Icon={Plus}
            size="sm"
            disabled={isCountLimitReached || isRowsLoading}
            onClick={onAddButtonClick}
          >
            {t('settings.slackChannels.addSlackChannel')}
          </CosButton>
        </span>
      </CosTooltip>
    </div>
  )
}
