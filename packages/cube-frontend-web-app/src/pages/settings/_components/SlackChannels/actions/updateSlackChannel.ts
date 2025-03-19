import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToSlackChannel } from '../slackChannelMappers'
import { ActionOptions } from './utils'

export const updateSlackChannel = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isSaving: true })

  const updatedSlackChannel = rowToSlackChannel(row)

  try {
    await settingsApi.updateSlackChannel({
      dataCenter,
      channelName: row.originalState.name,
      slackChannelPutRequest: updatedSlackChannel,
    })
    patchRow(row.id, {
      originalState: updatedSlackChannel,
      isEditing: false,
      isSaving: false,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Update slack channel error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
