import { noop } from 'lodash'
import { EmailSendersHeader } from './EmailSendersHeader'

export const EmailSenders = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <EmailSendersHeader isAddButtonVisible={true} onAddButtonClick={noop} />
      <p>🚧WIP🚧</p>
    </div>
  )
}
