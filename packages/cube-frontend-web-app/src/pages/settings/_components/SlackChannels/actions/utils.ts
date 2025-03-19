import { SlackChannelRow } from '../slackChannelsUtils'

export type ActionOptions = {
  dataCenter: string
  row: SlackChannelRow
  patchRow: (id: string, payload: Partial<SlackChannelRow>) => void
  onSuccess?: () => void
}
