import { GetSettingResponseDataEmail } from '@cube-frontend/api'
import { useMemo } from 'react'
import { EmailRecipients } from './recipients/EmailRecipients'
import { EmailSenders } from './senders/EmailSenders'
import { useEmailSenderRows } from './senders/useEmailSenderRows'

type EmailSettingsProps = {
  isLoading: boolean
  initialData: GetSettingResponseDataEmail | undefined
}

export const EmailSettings = (props: EmailSettingsProps) => {
  const { isLoading, initialData } = props

  const { rows: emailSenderRows, ...emailSenderHandlers } = useEmailSenderRows(
    initialData?.senders,
  )

  const hasVerifiedSender = useMemo<boolean>(
    () => emailSenderRows.some((row) => row.accessVerified),
    [emailSenderRows],
  )

  return (
    <div className="flex flex-col gap-y-6">
      <EmailRecipients hasVerifiedSender={hasVerifiedSender} />
      <EmailSenders
        isLoading={isLoading}
        rows={emailSenderRows}
        {...emailSenderHandlers}
      />
    </div>
  )
}
