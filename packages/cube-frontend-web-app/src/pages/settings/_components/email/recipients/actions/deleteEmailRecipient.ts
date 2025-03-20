import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { ActionOptions } from './utils'

export const deleteEmailRecipient = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isDeleting: true })

  try {
    await settingsApi.deleteEmailRecipient({
      dataCenter,
      recipientEmail: row.originalState.address,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Delete email recipient error: ', error)
    patchRow(row.id, { isDeleting: false })
  }
}
