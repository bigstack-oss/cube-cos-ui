import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { ActionOptions } from './utils'

export const trySlackChannel = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess, onError } = options

  patchRow(row.id, { isTrying: true })

  try {
    await settingsApi.trySlackChannel({
      dataCenter,
      channelName: row.name,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Try slack channel error: ', error)
    onError?.(error)
  } finally {
    patchRow(row.id, { isTrying: false })
  }
}
