import {
  ListTuningResponseDataTuningsInner,
  ListTuningResponseDataTuningsInnerHostsInner,
} from '@cube-frontend/api'
import { CosTableRow, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { z } from 'zod'
import { ListTuningsQuery } from './useListTuningsQuery'

export type TuningRow = ListTuningResponseDataTuningsInner & CosTableRow

const getRowId = (): string => uniqueId('tuning')

export const tuningToRow = (
  tuning: ListTuningResponseDataTuningsInner,
): TuningRow => ({
  ...structuredClone(tuning),
  id: getRowId(),
})

export const maxHostsDisplayCount = 10

export const joinHostNames = (
  hosts: ListTuningResponseDataTuningsInnerHostsInner[] | undefined,
): string | undefined => {
  return hosts?.map((host) => host.name).join(',')
}

const querySchema = z.object({
  keyword: z.string().nullable(),
  modified: z
    .enum(['true', 'false'])
    .nullable()
    .transform((value) => {
      if (value === 'true') {
        return true
      }
      if (value === 'false') {
        return false
      }
      return undefined
    }),
  hosts: z
    .string()
    .array()
    .nullable()
    .transform((array) => {
      return array?.filter((value) => !!value)
    }),
})

enum ParamKeyEnum {
  Keyword = 'keyword',
  Modified = 'modified',
  Hosts = 'hosts',
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): ListTuningsQuery => {
  const keyword = searchParams.get(ParamKeyEnum.Keyword)
  const modified = searchParams.get(ParamKeyEnum.Modified)
  const hosts = searchParams.getAll(ParamKeyEnum.Hosts)

  const parsedQuery = querySchema.safeParse({
    keyword,
    modified,
    hosts,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    selectedModified: [parsedQuery?.modified],
    hosts: parsedQuery?.hosts ?? [],
    currentPage: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }
}

export const queryToSearchParams = (
  query: ListTuningsQuery,
): URLSearchParams => {
  const { keyword, selectedModified, hosts } = query
  const modified = selectedModified[0]
  const nextSearchParams = new URLSearchParams()

  if (keyword) {
    nextSearchParams.set(ParamKeyEnum.Keyword, keyword)
  }

  if (modified !== undefined) {
    nextSearchParams.set(ParamKeyEnum.Modified, modified.toString())
  }

  hosts.forEach((host) => {
    nextSearchParams.append(ParamKeyEnum.Hosts, host)
  })

  return nextSearchParams
}
