import { DeepPartial } from '@cube-frontend/utils'
import { EmailSenderRow } from '../emailSendersUtils'

export type ActionOptions = {
  dataCenter: string
  row: EmailSenderRow
  patchRow: (id: string, payload: DeepPartial<EmailSenderRow>) => void
}
