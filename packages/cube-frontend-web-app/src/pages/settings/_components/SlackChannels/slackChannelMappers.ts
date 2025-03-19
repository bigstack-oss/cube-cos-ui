import { SlackChannelPostRequest } from '@cube-frontend/api'
import { getRowId, SlackChannelRow } from './slackChannelsUtils'

export const slackChannelToRow = (
  slackChannel: SlackChannelPostRequest,
): SlackChannelRow => ({
  name: slackChannel.name,
  url: slackChannel.url,
  description: slackChannel.description,
  id: getRowId(),
  originalState: { ...slackChannel },
  isNew: false,
  isEditing: false,
  isTrying: false,
  isSaving: false,
  isDeleting: false,
})

export const rowToSlackChannel = (
  row: SlackChannelRow,
): SlackChannelPostRequest => ({
  name: row.name,
  url: row.url,
  description: row.description,
})
