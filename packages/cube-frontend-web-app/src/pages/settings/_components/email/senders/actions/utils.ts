import { EmailSenderRow } from '../emailSendersUtils'

export type ActionOptions = {
  dataCenter: string
  row: EmailSenderRow
  patchRow: (id: string, payload: Partial<EmailSenderRow>) => void
}
