import { useTranslation } from 'react-i18next'
import { SlackChannelPostRequest } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { z } from 'zod'

export type SlackChannelRow = SlackChannelPostRequest &
  CosTableRow & {
    originalState: SlackChannelPostRequest
    isNew: boolean
    isEditing: boolean
    isTrying: boolean
    isSaving: boolean
    isDeleting: boolean
  }

export const getRowId = (): string => uniqueId('slack-channel')

const createSlackChannel = (): SlackChannelPostRequest => ({
  name: '',
  url: '',
  description: '',
})

export const createNewRow = (): SlackChannelRow => ({
  ...createSlackChannel(),
  id: getRowId(),
  originalState: createSlackChannel(),
  isNew: true,
  isEditing: true,
  isTrying: false,
  isSaving: false,
  isDeleting: false,
})

export const useSlackChannelSchema = () => {
  const { t } = useTranslation()
  return z.object({
    name: z.string().min(1, t('settings.slackChannels.invalidName')),
    url: z.string().url(t('settings.slackChannels.invalidUrl')),
    description: z.string(),
  })
}
