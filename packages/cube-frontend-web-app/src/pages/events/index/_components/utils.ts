import {
  GetEventsTypeEnum,
  GetEventFilterConditionResponseData,
  EventsApiGetEventsRequest,
} from '@cube-frontend/api'

type EventType = keyof GetEventFilterConditionResponseData

export type DropdownOptions = Record<string, string[]>

export const getEventsFilterOptions = (
  eventType: EventType,
  filterConditions: GetEventFilterConditionResponseData | undefined,
): DropdownOptions => {
  if (!filterConditions || !filterConditions[eventType]) return {}

  const eventFilters = filterConditions[eventType]

  return Object.keys(eventFilters).reduce((options, key) => {
    options[key] = (eventFilters as unknown as DropdownOptions)[key]
    return options
  }, {} as DropdownOptions)
}

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

export const getEventType = (
  key: string | undefined,
): GetEventsTypeEnum | undefined => {
  let eventType: GetEventsTypeEnum | undefined = undefined

  switch (key) {
    case 'system':
      eventType = GetEventsTypeEnum.System
      break

    case 'host':
      eventType = GetEventsTypeEnum.Host
      break

    case 'instance':
      eventType = GetEventsTypeEnum.Instance
      break

    default:
      console.warn('Not a valid event type')
  }

  return eventType
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
