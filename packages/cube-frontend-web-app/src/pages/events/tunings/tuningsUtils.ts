import { ListTuningResponseDataTuningsInner } from '@cube-frontend/api'
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

export const modifiedOptions = [true, false] as const

const querySchema = z.object({
  keyword: z.string().nullable(),
  modified: z
    .enum(['true', 'false'])
    .nullable()
    .transform((value) => {
      return value === 'true'
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
  const modified = searchParams.getAll(ParamKeyEnum.Modified)
  const hosts = searchParams.getAll(ParamKeyEnum.Hosts)

  const parsedQuery = querySchema.safeParse({
    keyword,
    modified,
    hosts,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    modified: (parsedQuery?.modified ?? []) as boolean[],
    hosts: parsedQuery?.hosts ?? [],
    currentPage: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }
}

export const queryToSearchParams = (
  query: ListTuningsQuery,
): URLSearchParams => {
  const { keyword, modified, hosts } = query
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

  return nextSearchParams
}
