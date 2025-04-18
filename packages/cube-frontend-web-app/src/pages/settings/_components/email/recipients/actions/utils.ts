import { DeepPartial } from '@cube-frontend/utils'
import { EmailRecipientRow } from '../emailRecipientsUtils'

export type ActionOptions = {
  dataCenter: string
  row: EmailRecipientRow
  patchRow: (id: string, payload: DeepPartial<EmailRecipientRow>) => void
  onSuccess?: () => void
  onError?: (error: unknown) => void
}
