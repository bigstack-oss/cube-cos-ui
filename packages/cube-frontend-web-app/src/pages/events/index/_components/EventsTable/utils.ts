import dayjs from 'dayjs'

const eventsRequestKeyMapping: Record<string, string> = {
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

  if (result['start'] && result['stop'] && result['start'] === result['stop']) {
    delete result['stop']
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
