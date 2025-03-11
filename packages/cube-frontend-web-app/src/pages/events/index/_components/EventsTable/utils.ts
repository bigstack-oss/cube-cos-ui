import {
  GetEventsTypeEnum,
  EventsApiGetEventsRequest,
} from '@cube-frontend/api'

export type DropdownOptions = Record<string, string[]>

export const getFullEventRequestParams = (
  eventType: GetEventsTypeEnum,
  filters: Record<string, Record<string, string>>,
  baseRequestParams: EventsApiGetEventsRequest,
): EventsApiGetEventsRequest => {
  if (!filters[eventType]) {
    throw new Error(`Invalid filter key: ${eventType}`)
  }

  const newRequestParams: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(filters[eventType])) {
    if (Array.isArray(value) && value.length > 0) {
      newRequestParams[key] = value
    }
  }

  return {
    ...baseRequestParams,
    ...newRequestParams,
  } satisfies EventsApiGetEventsRequest
}

export const getFilterKey = (key: string): string => {
  let filterKey: string

  switch (key) {
    case 'severities':
      filterKey = 'severity'
      break

    case 'categories':
      filterKey = 'category'
      break

    case 'ids':
      filterKey = 'id'
      break

    case 'names':
      filterKey = 'name'
      break

    default:
      console.warn('Not a valid filter key')
      filterKey = ''
  }

  return filterKey
}
