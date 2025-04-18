import { SettingStatusCurrentEnum } from '@cube-frontend/api'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailSenderPostRequest } from '../emailSenderMappers'
import { getRowId } from '../emailSendersUtils'
import { ActionOptions } from './utils'

export const createEmailSender = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onError } = options

  const statusBeforeCreate = { ...row.status }

  patchRow(row.id, {
    status: {
      current: SettingStatusCurrentEnum.Updating,
      isUpdating: true,
    },
  })

  const newEmailSender = rowToEmailSenderPostRequest(row)

  try {
    await settingsApi.createEmailSender({
      dataCenter,
      emailSenderPostRequest: newEmailSender,
    })
    patchRow(row.id, {
      password: '',
      accessVerified: false,
      status: {
        current: SettingStatusCurrentEnum.Ok,
        isUpdating: false,
      },
      id: getRowId(),
      originalState: {
        ...newEmailSender,
        port: row.port,
        password: '',
        accessVerified: false,
      },
      isNew: false,
      isEditing: false,
    })
  } catch (error) {
    console.error('Create email sender error: ', error)
    patchRow(row.id, {
      status: statusBeforeCreate,
    })
    onError?.(error)
  }
}
