import { GetSettingResponseDataEmail } from '@cube-frontend/api'
import { EmailRecipients } from './recipients/EmailRecipients'
import { EmailSenders } from './senders/EmailSenders'

type EmailSettingsProps = {
  isLoading: boolean
  initialData: GetSettingResponseDataEmail | undefined
}

export const EmailSettings = (_props: EmailSettingsProps) => {
  // TODO: Manage the email senders state here so the "Try Email Recipient"
  // button can be disabled when there's no verified email senders.
  return (
    <div className="flex flex-col gap-y-6">
      <EmailRecipients />
      <EmailSenders />
    </div>
  )
}
