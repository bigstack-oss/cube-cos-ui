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

// TODO: Replace error messages with i18n keys.
export const slackChannelSchema = z.object({
  name: z.string().min(1, 'Invalid name'),
  url: z
    .string()
    .regex(/^https:\/\/hooks\.slack\.com\/services\/.+/, 'Invalid url'),
  description: z.string(),
})
