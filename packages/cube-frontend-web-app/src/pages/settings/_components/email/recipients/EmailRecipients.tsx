import { noop } from 'lodash'
import { EmailRecipientsHeader } from './EmailRecipientsHeader'

export const EmailRecipients = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <EmailRecipientsHeader onAddButtonClick={noop} />
      <p>🚧WIP🚧</p>
    </div>
  )
}
