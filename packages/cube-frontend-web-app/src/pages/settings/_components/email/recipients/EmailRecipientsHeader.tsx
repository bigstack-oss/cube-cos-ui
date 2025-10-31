import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosTooltip,
  CosTooltipInformation,
} from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export type EmailRecipientsHeaderProps = {
  isCountLimitReached: boolean
  isRowsLoading: boolean
  onAddButtonClick: () => void
}

export const EmailRecipientsHeader = (props: EmailRecipientsHeaderProps) => {
  const { isCountLimitReached, isRowsLoading, onAddButtonClick } = props

  const { t } = useTranslation()

  const getAddButtonHoverInfo = (): CosTooltipInformation | undefined => {
    if (!isCountLimitReached) {
      return undefined
    }
    return {
      message: t('settings.emailRecipients.limitReachedTooltip'),
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <p className="secondary-h5 text-functional-title">
          {t('settings.emailRecipients.title')}
        </p>
        <CosTooltip
          hoverContent={{
            message: t('settings.emailRecipients.title.tooltip', { count: 10 }),
          }}
        >
          <InformationCircleFilled className="icon-md text-functional-border-divider" />
        </CosTooltip>
      </div>
      <CosTooltip hoverContent={getAddButtonHoverInfo()}>
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
            {t('settings.emailRecipients.addEmailRecipient')}
          </CosButton>
        </span>
      </CosTooltip>
    </div>
  )
}
