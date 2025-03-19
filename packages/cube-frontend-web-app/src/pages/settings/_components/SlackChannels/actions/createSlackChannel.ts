import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { rowToSlackChannel } from '../slackChannelMappers'
import { getRowId } from '../slackChannelsUtils'
import { ActionOptions } from './utils'

export const createSlackChannel = async (
  options: ActionOptions,
): Promise<void> => {
  const { dataCenter, row, patchRow, onSuccess } = options

  patchRow(row.id, { isSaving: true })

  const newSlackChannel = rowToSlackChannel(row)

  try {
    await settingsApi.createSlackChannel({
      dataCenter,
      slackChannelPostRequest: newSlackChannel,
    })
    patchRow(row.id, {
      id: getRowId(),
      originalState: newSlackChannel,
      isNew: false,
      isEditing: false,
      isSaving: false,
    })
    onSuccess?.()
  } catch (error) {
    console.error('Create slack channel error: ', error)
    patchRow(row.id, { isSaving: false })
  }
}
