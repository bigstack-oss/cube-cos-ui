import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { ActionOptions } from './utils'

export const deleteSlackChannel = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isDeleting: true })

  try {
    await settingsApi.deleteSlackChannel({
      dataCenter,
      channelName: row.originalState.name,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Delete slack channel error: ', error)
    patchRow(row.id, { isDeleting: false })
  }
}
