import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailSenderPostRequest } from '../emailSenderMappers'
import { getRowId } from '../emailSendersUtils'
import { ActionOptions } from './utils'

export const createEmailSender = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow } = options

  patchRow(row.id, { isSaving: true })

  const newEmailSender = rowToEmailSenderPostRequest(row)

  try {
    await settingsApi.createEmailSender({
      dataCenter,
      emailSenderPostRequest: newEmailSender,
    })
    patchRow(row.id, {
      password: '',
      accessVerified: false,
      id: getRowId(),
      originalState: {
        ...newEmailSender,
        port: row.port,
        password: '',
        accessVerified: false,
      },
      isNew: false,
      isEditing: false,
      isSaving: false,
    })
  } catch (error) {
    console.error('Create email sender error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
