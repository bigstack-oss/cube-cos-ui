import dayjs from 'dayjs'
import {
  EventsApiGetEventsRequest,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import {
  DatePickerDates,
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { EventsQuery } from './useEventsQuery'

const getValidType = (type: string): GetEventsTypeEnum => {
  const defaultType = GetEventsTypeEnum.System

  if (!type) {
    return defaultType
  }

  const validTypes = Object.values(GetEventsTypeEnum) as string[]

  if (validTypes.includes(type)) {
    return type as GetEventsTypeEnum
  }

  return defaultType
}

export const initEventsQuery = (searchParams: URLSearchParams): EventsQuery => {
  const type = getValidType(searchParams.get('type') ?? '')

  const keyword = searchParams.get('keyword') ?? ''

  const category = searchParams.get('category') ?? undefined

  const startDate = searchParams.get('start')
    ? dayjs(searchParams.get('start') ?? '')
    : undefined

  const endDate = searchParams.get('stop')
    ? dayjs(searchParams.get('stop') ?? '')
    : undefined

  const pageSize = (parseInt(searchParams.get('pageSize') ?? '') ||
    DEFAULT_ITEMS_PER_PAGE) as ItemsPerPage

  const pageNum = parseInt(searchParams.get('pageNum') ?? '') || 1

  const severity = searchParams.get('severity') ?? undefined

  const host = searchParams.get('host') ?? undefined

  const instance = searchParams.get('instance') ?? undefined

  return {
    type,
    keyword,
    category,
    start: startDate?.isValid() ? startDate : undefined,
    stop: endDate?.isValid() ? endDate : undefined,
    pageSize,
    pageNum,
    severity,
    host,
    instance,
  }
}

export const datesToRequestParams = (
  dates: DatePickerDates,
): Pick<EventsApiGetEventsRequest, 'start' | 'stop'> => {
  const { start: selectedStartDate, end: selectedEndDate } = dates

  let start: string | undefined = undefined
  let stop: string | undefined = undefined

  if (selectedStartDate) {
    start = selectedStartDate.format()
  }

  if (selectedEndDate) {
    stop = selectedEndDate.format()
  }

  return {
    start,
    stop,
  }
}
