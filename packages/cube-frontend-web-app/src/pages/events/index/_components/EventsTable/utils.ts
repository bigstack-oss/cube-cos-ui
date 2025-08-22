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
  Categories = 'categories',
  Severities = 'severities',
  Hosts = 'hosts',
  Instances = 'instances',
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
  [EventsParamKeyEnum.Categories]: z
    .string()
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Severities]: z
    .nativeEnum(GetEventsSeveritiesEnum)
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Hosts]: z
    .string()
    .array()
    .nullable()
    .transform((array) => array ?? []),
  [EventsParamKeyEnum.Instances]: z
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
  const categories = searchParams.getAll(EventsParamKeyEnum.Categories)
  const severities = searchParams.getAll(EventsParamKeyEnum.Severities)
  const hosts = searchParams.getAll(EventsParamKeyEnum.Hosts)
  const instances = searchParams.getAll(EventsParamKeyEnum.Instances)
  const startDate = searchParams.get(EventsParamKeyEnum.StartDate)
  const endDate = searchParams.get(EventsParamKeyEnum.EndDate)
  const currentPage = searchParams.get(EventsParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(EventsParamKeyEnum.ItemsPerPage)

  const parsedQuery = _eventsQuerySchema.safeParse({
    type,
    keyword,
    categories,
    severities,
    hosts,
    instances,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  }).data

  return {
    type: parsedQuery?.type ?? GetEventsTypeEnum.System,
    keyword: parsedQuery?.keyword ?? '',
    categories: parsedQuery?.categories ?? [],
    severities: parsedQuery?.severities ?? [],
    hosts: parsedQuery?.hosts ?? [],
    instances: parsedQuery?.instances ?? [],
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
    categories,
    severities,
    hosts,
    instances,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  } = query
  const nextSearchParams = new URLSearchParams()

  //
  nextSearchParams.set(EventsParamKeyEnum.Type, type)

  nextSearchParams.set(EventsParamKeyEnum.CurrentPage, currentPage.toString())

  nextSearchParams.set(EventsParamKeyEnum.ItemsPerPage, itemsPerPage.toString())

  if (keyword) {
    nextSearchParams.set(EventsParamKeyEnum.Keyword, keyword)
  }

  if (categories?.length !== 0)
    categories.forEach((category) => {
      nextSearchParams.append(EventsParamKeyEnum.Categories, category)
    })

  if (severities?.length !== 0)
    severities.forEach((severity) => {
      nextSearchParams.append(EventsParamKeyEnum.Severities, severity)
    })

  if (hosts?.length !== 0)
    hosts.forEach((host) => {
      nextSearchParams.append(EventsParamKeyEnum.Hosts, host)
    })

  if (instances?.length !== 0)
    instances.forEach((instance) => {
      nextSearchParams.append(EventsParamKeyEnum.Instances, instance)
    })

  if (startDate)
    nextSearchParams.set(EventsParamKeyEnum.StartDate, startDate.format())

  if (endDate)
    nextSearchParams.set(EventsParamKeyEnum.EndDate, endDate.format())

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
