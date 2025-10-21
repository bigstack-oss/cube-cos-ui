import { useTranslation } from 'react-i18next'
import { EventTableType } from './EventsTable'

export type DisplayColumns = Pick<
  EventTableType,
  'severity' | 'eventId' | 'time' | 'description' | 'metadata'
>

export const useEventTableColumns = (): Record<
  keyof DisplayColumns,
  { label: string; property: keyof EventTableType }
> => {
  const { t } = useTranslation()

  return {
    severity: {
      label: t('events.severity'),
      property: 'severity',
    },
    eventId: {
      label: t('events.eventId'),
      property: 'eventId',
    },
    time: {
      label: t('events.time'),
      property: 'time',
    },
    description: {
      label: t('events.description'),
      property: 'description',
    },
    metadata: {
      label: t('events.metadata'),
      property: 'metadata',
    },
  }
}
