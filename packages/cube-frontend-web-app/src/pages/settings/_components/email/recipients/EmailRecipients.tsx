import { noop } from 'lodash'
import { EmailRecipientsHeader } from './EmailRecipientsHeader'

type EmailRecipientProps = {
  hasVerifiedSender: boolean
}

export const EmailRecipients = (_props: EmailRecipientProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <EmailRecipientsHeader onAddButtonClick={noop} />
      <p>🚧WIP🚧</p>
    </div>
  )
}
