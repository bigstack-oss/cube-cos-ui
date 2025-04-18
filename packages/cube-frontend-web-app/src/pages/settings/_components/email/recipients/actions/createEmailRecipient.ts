import { SettingStatusCurrentEnum } from '@cube-frontend/api'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToEmailPostRequest } from '../emailRecipientMappers'
import { getRowId } from '../emailRecipientsUtils'
import { ActionOptions } from './utils'

export const createEmailRecipient = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess, onError } = options

  const statusBeforeCreate = { ...row.status }

  patchRow(row.id, {
    status: {
      current: SettingStatusCurrentEnum.Updating,
      isUpdating: true,
    },
  })

  const newEmailRecipient = rowToEmailPostRequest(row)

  try {
    await settingsApi.createEmailRecipient({
      dataCenter,
      emailRecipientPostRequest: newEmailRecipient,
    })
    patchRow(row.id, {
      id: getRowId(),
      originalState: newEmailRecipient,
      status: {
        current: SettingStatusCurrentEnum.Ok,
        isUpdating: false,
      },
      isNew: false,
      isEditing: false,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Create email recipient error: ', error)
    patchRow(row.id, {
      status: statusBeforeCreate,
    })
    onError?.(error)
  }
}
