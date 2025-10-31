import { useTranslation } from 'react-i18next'
import { CosButton, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export type EmailSendersHeaderProps = {
  isAddButtonVisible: boolean
  onAddButtonClick: () => void
}

export const EmailSendersHeader = (props: EmailSendersHeaderProps) => {
  const { isAddButtonVisible, onAddButtonClick } = props

  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <p className="secondary-h5 text-functional-title">
          {t('settings.emailSender.title')}
        </p>
        <CosTooltip
          hoverContent={{
            message: t('settings.emailSender.title.tooltip', { count: 10 }),
          }}
        >
          <InformationCircleFilled className="icon-md text-functional-border-divider" />
        </CosTooltip>
      </div>
      {isAddButtonVisible && (
        <CosButton
          type="secondary"
          usage="icon-left"
          Icon={Plus}
          size="sm"
          onClick={onAddButtonClick}
        >
          {t('settings.emailSender.addEmailSender')}
        </CosButton>
      )}
    </div>
  )
}
