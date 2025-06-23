import { z } from 'zod'
import {
  EventsApiGetEventsRequest,
  GetEventsSeveritiesEnum,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import {
  DatePickerDates,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { transformDate } from '@cube-frontend/web-app/utils/date'

export enum EventsParamKeyEnum {
  Type = 'type',
  Keyword = 'keyword',
  Category = 'category',
  Severity = 'severity',
  Host = 'host',
  Instance = 'instance',
  StartDate = 'startDate',
  EndDate = 'endDate',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

const _eventsQuerySchema = paginationQuerySchema.extend({
  [EventsParamKeyEnum.Type]: z
    .nativeEnum(GetEventsTypeEnum)
    .default(GetEventsTypeEnum.System),
  [EventsParamKeyEnum.Keyword]: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  [EventsParamKeyEnum.Category]: z
    .string()
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Severity]: z
    .nativeEnum(GetEventsSeveritiesEnum)
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Host]: z
    .string()
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Instance]: z
    .string()
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.StartDate]: z
    .string()
    .nullable()
    .transform(transformDate),
  [EventsParamKeyEnum.EndDate]: z.string().nullable().transform(transformDate),
})

export type EventsQuery = z.output<typeof _eventsQuerySchema>

const getValidType = (type: string | null): GetEventsTypeEnum => {
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

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): EventsQuery => {
  const typeFromURL = searchParams.get(EventsParamKeyEnum.Type)
  const type = getValidType(typeFromURL)
  const keyword = searchParams.get(EventsParamKeyEnum.Keyword)
  const category = searchParams.getAll(EventsParamKeyEnum.Category)
  const severity = searchParams.getAll(EventsParamKeyEnum.Severity)
  const host = searchParams.getAll(EventsParamKeyEnum.Host)
  const instance = searchParams.getAll(EventsParamKeyEnum.Instance)
  const startDate = searchParams.get(EventsParamKeyEnum.StartDate)
  const endDate = searchParams.get(EventsParamKeyEnum.EndDate)
  const currentPage = searchParams.get(EventsParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(EventsParamKeyEnum.ItemsPerPage)

  const parsedQuery = _eventsQuerySchema.safeParse({
    type,
    keyword,
    category,
    severity,
    host,
    instance,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  }).data

  return {
    type: parsedQuery?.type ?? GetEventsTypeEnum.System,
    keyword: parsedQuery?.keyword ?? '',
    category: parsedQuery?.category ?? [],
    severity: parsedQuery?.severity ?? [],
    host: parsedQuery?.host ?? [],
    instance: parsedQuery?.instance ?? [],
    startDate: parsedQuery?.startDate,
    endDate: parsedQuery?.endDate,
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

export const queryToSearchParams = (query: EventsQuery): URLSearchParams => {
  const {
    type,
    keyword,
    category,
    severity,
    host,
    instance,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  } = query
  const nextSearchParams = new URLSearchParams()

  nextSearchParams.set(EventsParamKeyEnum.Type, type)

  if (keyword) {
    nextSearchParams.set(EventsParamKeyEnum.Keyword, keyword)
  }

  category.forEach((category) => {
    nextSearchParams.append(EventsParamKeyEnum.Category, category)
  })

  severity.forEach((severity) => {
    nextSearchParams.append(EventsParamKeyEnum.Severity, severity)
  })

  host.forEach((host) => {
    nextSearchParams.append(EventsParamKeyEnum.Host, host)
  })

  instance.forEach((instance) => {
    nextSearchParams.append(EventsParamKeyEnum.Instance, instance)
  })

  if (startDate)
    nextSearchParams.set(EventsParamKeyEnum.StartDate, startDate.format())

  if (endDate)
    nextSearchParams.set(EventsParamKeyEnum.EndDate, endDate.format())

  if (currentPage) {
    nextSearchParams.set(EventsParamKeyEnum.CurrentPage, currentPage.toString())
  }
  if (itemsPerPage) {
    nextSearchParams.set(
      EventsParamKeyEnum.ItemsPerPage,
      itemsPerPage.toString(),
    )
  }

  return nextSearchParams
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
