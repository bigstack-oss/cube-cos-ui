import { EventsApiGetEventsRequest } from '@cube-frontend/api'
import dayjs from 'dayjs'

const eventsRequestKeyMapping: Record<string, keyof EventsApiGetEventsRequest> =
  {
    startDate: 'start',
    endDate: 'stop',
    category: 'category',
    severity: 'severity',
    keyword: 'keyword',
    name: 'host',
    id: 'instance',
  }

export const mapFilterToRequestParams = (filter: Record<string, string>) => {
  const result = Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (value && key in eventsRequestKeyMapping) {
        const mappedKey =
          eventsRequestKeyMapping[key as keyof typeof eventsRequestKeyMapping]
        acc[mappedKey] =
          mappedKey === 'start' || mappedKey === 'stop'
            ? dayjs(value).toISOString()
            : value
      }
      return acc
    },
    {} as Record<string, string>,
  )

  /**
   * Check if start and stop are the same and modify the times
   * - start => "YYYY-MM-DD 00:00:00"
   * - stop  => "YYYY-MM-DD 23:59:59"
   */
  if (result['start'] && result['stop'] && result['start'] === result['stop']) {
    const sameDay = dayjs(result['start'])
    result['start'] = sameDay.startOf('day').toISOString()
    result['stop'] = sameDay.endOf('day').toISOString()
  }

  return result
}

const filterKeyMapping: Record<string, string> = {
  severities: 'severity',
  categories: 'category',
  ids: 'id',
  names: 'name',
}

export const mapFilterToFilterKey = (key: string): string => {
  const filterKey = filterKeyMapping[key] || ''
  if (!filterKey) {
    console.warn('Not a valid filter key')
  }

  return filterKey
}
