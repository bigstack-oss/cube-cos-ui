import {
  GetSettingResponseDataEmail,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import { useMemo } from 'react'
import { EmailRecipients } from './recipients/EmailRecipients'
import { EmailSenders } from './senders/EmailSenders'
import { useEmailSenderRows } from './senders/useEmailSenderRows'

type EmailSettingsProps = {
  isLoading: boolean
  dataFromApi: GetSettingResponseDataEmail | undefined
}

export const EmailSettings = (props: EmailSettingsProps) => {
  const { isLoading, dataFromApi } = props

  const { rows: emailSenderRows, ...emailSenderHandlers } = useEmailSenderRows(
    dataFromApi?.senders,
  )

  const hasVerifiedSender = useMemo<boolean>(
    () =>
      emailSenderRows.some(
        (row) =>
          row.accessVerified &&
          row.status.current === SettingStatusCurrentEnum.Ok,
      ),
    [emailSenderRows],
  )

  return (
    <div className="flex flex-col gap-y-6">
      <EmailRecipients
        isLoading={isLoading}
        recipientsFromApi={dataFromApi?.recipients}
        hasVerifiedSender={hasVerifiedSender}
      />
      <EmailSenders
        isLoading={isLoading}
        rows={emailSenderRows}
        {...emailSenderHandlers}
      />
    </div>
  )
}
