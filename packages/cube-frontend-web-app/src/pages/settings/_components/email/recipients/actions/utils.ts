import { EmailRecipientRow } from '../emailRecipientsUtils'

export type ActionOptions = {
  dataCenter: string
  row: EmailRecipientRow
  patchRow: (id: string, payload: Partial<EmailRecipientRow>) => void
  onSuccess?: () => void
}
