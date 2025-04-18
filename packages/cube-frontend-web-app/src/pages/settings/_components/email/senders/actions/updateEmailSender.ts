import { SettingStatusCurrentEnum } from '@cube-frontend/api'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailSenderPutRequest } from '../emailSenderMappers'
import { ActionOptions } from './utils'

export const updateEmailSender = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onError } = options

  const statusBeforeUpdate = { ...row.status }

  patchRow(row.id, {
    status: {
      current: SettingStatusCurrentEnum.Updating,
      isUpdating: true,
    },
  })

  const updatedEmailSender = rowToEmailSenderPutRequest(row)

  try {
    await settingsApi.updateEmailSender({
      dataCenter,
      senderHost: row.originalState.host,
      emailSenderPutRequest: updatedEmailSender,
    })
    patchRow(row.id, {
      password: '',
      accessVerified: false,
      originalState: {
        ...updatedEmailSender,
        port: row.port,
        password: '',
        accessVerified: false,
      },
      isEditing: false,
    })
  } catch (error) {
    console.error('Update email sender error: ', error)
    patchRow(row.id, {
      status: statusBeforeUpdate,
    })
    onError?.(error)
  }
}
