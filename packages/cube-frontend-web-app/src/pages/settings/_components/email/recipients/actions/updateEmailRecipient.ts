import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailPutRequest } from '../emailRecipientMappers'
import { ActionOptions } from './utils'

export const updateEmailRecipient = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isSaving: true })

  const updatedEmailRecipient = rowToEmailPutRequest(row)

  try {
    await settingsApi.updateEmailRecipient({
      dataCenter,
      recipientEmail: row.originalState.address,
      emailRecipientPutRequest: updatedEmailRecipient,
    })
    patchRow(row.id, {
      originalState: {
        address: row.address,
        note: row.note,
      },
      isEditing: false,
      isSaving: false,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Update email recipient error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
