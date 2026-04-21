import { useTranslation } from 'react-i18next'
import { GetHealthHistoryPastEnum } from '@cube-frontend/api'

export const timeRanges = Object.values(GetHealthHistoryPastEnum)

export type TimeRange = (typeof timeRanges)[number]

export const useTimeRangeLabels = (): Record<TimeRange, string> => {
  const { t } = useTranslation()

  return {
    '30d': t('common.time.lastDays', { count: 30 }),
    '14d': t('common.time.lastDays', { count: 14 }),
    '7d': t('common.time.lastDays', { count: 7 }),
    '24h': t('common.time.lastHours', { count: 24 }),
    '1h': t('common.time.lastHours', { count: 1 }),
  }
}
