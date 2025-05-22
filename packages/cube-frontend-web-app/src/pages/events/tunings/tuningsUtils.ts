import { ListTuningResponseDataTuningsInner } from '@cube-frontend/api'
import {
  CosTableRow,
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { z } from 'zod'
import { ListTuningsQuery } from './useListTuningsQuery'

export type TuningRow = ListTuningResponseDataTuningsInner & CosTableRow

const computeTuningRowId = (
  tuning: ListTuningResponseDataTuningsInner,
): string => {
  // The combination of tuning name and hosts is guaranteed to be unique.
  const { name, hosts } = tuning
  const hostNames = hosts.map((host) => host.name)
  return JSON.stringify({ name, hostNames })
}

export const tuningToRow = (
  tuning: ListTuningResponseDataTuningsInner,
): TuningRow => ({
  ...structuredClone(tuning),
  id: computeTuningRowId(tuning),
})

export const modifiedOptions = [true, false] as const

const querySchema = z.object({
  keyword: z.string().nullable(),
  modified: z
    .enum(['true', 'false'])
    .array()
    .nullable()
    .transform((array) => {
      return array?.map((value) => value === 'true')
    }),
  hosts: z
    .string()
    .array()
    .nullable()
    .transform((array) => {
      return array?.filter((value) => !!value)
    }),
  currentPage: z
    .string()
    .nullable()
    .transform((value) => {
      return value ? parseInt(value, 10) : 1
    }),
  itemsPerPage: z
    .string()
    .nullable()
    .transform((value) => {
      if (!value) {
        return DEFAULT_ITEMS_PER_PAGE
      }
      return parseInt(value, 10) as ItemsPerPage
    }),
})

enum ParamKeyEnum {
  Keyword = 'keyword',
  Modified = 'modified',
  Hosts = 'hosts',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): ListTuningsQuery => {
  const keyword = searchParams.get(ParamKeyEnum.Keyword)
  const modified = searchParams.getAll(ParamKeyEnum.Modified)
  const hosts = searchParams.getAll(ParamKeyEnum.Hosts)
  const currentPage = searchParams.get(ParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(ParamKeyEnum.ItemsPerPage)

  const parsedQuery = querySchema.safeParse({
    keyword,
    modified,
    hosts,
    currentPage,
    itemsPerPage,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    modified: (parsedQuery?.modified ?? []) as boolean[],
    hosts: parsedQuery?.hosts ?? [],
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

export const queryToSearchParams = (
  query: ListTuningsQuery,
): URLSearchParams => {
  const { keyword, modified, hosts, currentPage, itemsPerPage } = query
  const nextSearchParams = new URLSearchParams()

  if (keyword) {
    nextSearchParams.set(ParamKeyEnum.Keyword, keyword)
  }

  modified.forEach((modified) => {
    nextSearchParams.append(ParamKeyEnum.Modified, modified.toString())
  })

  hosts.forEach((host) => {
    nextSearchParams.append(ParamKeyEnum.Hosts, host)
  })

  nextSearchParams.set(ParamKeyEnum.CurrentPage, currentPage.toString())
  nextSearchParams.set(ParamKeyEnum.ItemsPerPage, itemsPerPage.toString())

  return nextSearchParams
}
