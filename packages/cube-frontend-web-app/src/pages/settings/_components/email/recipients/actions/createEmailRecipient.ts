import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailPostRequest } from '../emailRecipientMappers'
import { getRowId } from '../emailRecipientsUtils'
import { ActionOptions } from './utils'

export const createEmailRecipient = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isSaving: true })

  const newEmailRecipient = rowToEmailPostRequest(row)

  try {
    await settingsApi.createEmailRecipient({
      dataCenter,
      emailRecipientPostRequest: newEmailRecipient,
    })
    patchRow(row.id, {
      id: getRowId(),
      originalState: newEmailRecipient,
      isNew: false,
      isEditing: false,
      isSaving: false,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Create email recipient error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
