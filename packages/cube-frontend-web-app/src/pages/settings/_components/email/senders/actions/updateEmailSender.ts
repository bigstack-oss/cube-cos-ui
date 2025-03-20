import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailSenderPutRequest } from '../emailSenderMappers'
import { ActionOptions } from './utils'

export const updateEmailSender = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow } = options

  patchRow(row.id, { isSaving: true })

  const updatedEmailSender = rowToEmailSenderPutRequest(row)

  try {
    await settingsApi.updateEmailSender({
      dataCenter,
      senderHost: row.originalState.host,
      emailSenderPutRequest: updatedEmailSender,
    })
    patchRow(row.id, {
      originalState: {
        ...row,
        password: '',
        accessVerified: false,
      },
      isEditing: false,
      isSaving: false,
      accessVerified: false,
    })
  } catch (error) {
    console.error('Update email sender error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
