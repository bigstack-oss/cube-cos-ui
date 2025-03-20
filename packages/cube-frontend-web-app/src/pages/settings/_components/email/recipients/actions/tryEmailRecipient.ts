import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { ActionOptions } from './utils'

export const tryEmailRecipient = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isTrying: true })

  try {
    await settingsApi.tryEmailRecipient({
      dataCenter,
      recipientEmail: row.originalState.address,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Try email recipient error: ', error)
  } finally {
    patchRow(row.id, { isTrying: false })
  }
}
