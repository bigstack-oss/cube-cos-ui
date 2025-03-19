import { SlackChannelPostRequest } from '@cube-frontend/api'
import { useMemo } from 'react'
import { ErrorRecord, validateBySchema } from '../validateBySchema'
import { SlackChannelRow, slackChannelSchema } from './slackChannelsUtils'

export type SlackChannelRowError = ErrorRecord<SlackChannelPostRequest>

const computeUrlCountMap = (rows: SlackChannelRow[]): Map<string, number> => {
  const map = new Map<string, number>()
  rows.forEach((row) => {
    const count = map.get(row.url) ?? 0
    map.set(row.url, count + 1)
  })
  return map
}

export const useSlackChannelRowsErrorMap = (
  rows: SlackChannelRow[],
): Map<string, SlackChannelRowError> => {
  const errorMap = useMemo<Map<string, SlackChannelRowError>>(() => {
    const urlCountMap = computeUrlCountMap(rows)
    const errorMap = new Map<string, SlackChannelRowError>()

    rows.forEach((row) => {
      const errorRecord = validateBySchema<SlackChannelPostRequest>(
        slackChannelSchema,
        row,
      )

      const isUrlFormatValid = !errorRecord.url
      if (isUrlFormatValid) {
        // URL format is valid. Proceeding to check for duplicates.
        const sameUrlCount = urlCountMap.get(row.url) ?? 0
        if (sameUrlCount > 1) {
          // TODO: Replace this with i18n key.
          errorRecord.url = 'Duplicate url'
        }
      }

      errorMap.set(row.id, errorRecord)
    })

    return errorMap
  }, [rows])

  return errorMap
}
