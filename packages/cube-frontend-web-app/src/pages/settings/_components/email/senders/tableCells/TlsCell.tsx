import { useTranslation } from 'react-i18next'
import { EmailSenderTls } from '@cube-frontend/api'
import { CosDropdown, CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import {
  EmailSenderForUi,
  EmailSenderRow,
  emailSenderTlsOptions,
} from '../emailSendersUtils'

type TlsCellProps = {
  row: EmailSenderRow
  onFieldChange: (payload: Partial<EmailSenderForUi>) => void
}

export const TlsCell = (props: TlsCellProps) => {
  const { row, onFieldChange } = props

  const { t } = useTranslation()

  const {
    tls,
    isNew,
    isEditing,
    status: { isUpdating },
  } = row

  const tlsLabels: Record<EmailSenderTls, string> = {
    [EmailSenderTls.None]: t('settings.emailSender.tls.none'),
    [EmailSenderTls.Opportunistic]: t('settings.emailSender.tls.opportunistic'),
    [EmailSenderTls.Mandatory]: t('settings.emailSender.tls.mandatory'),
  }

  if (!isEditing) {
    if (isNew) {
      return ''
    }
    return tlsLabels[tls]
  }

  return (
    <div className="flex items-center gap-x-2">
      <CosDropdown
        size="sm"
        type="radio"
        selectedItems={[tls]}
        disabled={isUpdating}
      >
        <CosDropdown.Trigger>{tlsLabels[tls]}</CosDropdown.Trigger>
        <CosDropdown.Menu>
          {emailSenderTlsOptions.map((option) => (
            <CosDropdown.Item
              key={option}
              item={option}
              onClick={() => onFieldChange({ tls: option })}
            >
              {tlsLabels[option]}
            </CosDropdown.Item>
          ))}
        </CosDropdown.Menu>
      </CosDropdown>
      {/* Alert mail is sent by Kapacitor, which cannot honour every policy,
          so say which part of the choice applies to it. */}
      <CosTooltip
        hoverContent={{
          message: t('settings.emailSender.tls.tooltip'),
        }}
      >
        <InformationCircle className="icon-md text-functional-text-light" />
      </CosTooltip>
    </div>
  )
}
