import { z } from 'zod'
import { NodeRole } from '@cube-frontend/api'
import { DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { transformDate } from '@cube-frontend/web-app/utils/date'

enum SupportFileParamKeyEnum {
  Keyword = 'keyword',
  Roles = 'roles',
  StartDate = 'startDate',
  EndDate = 'endDate',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

const supportFileListQuerySchema = paginationQuerySchema.extend({
  keyword: z
    .string()
    .nullable()
    .transform((value) => {
      return value ?? ''
    }),
  roles: z
    .enum(Object.values(NodeRole) as [string, ...string[]])
    .array()
    .nullable()
    .transform((array) => {
      return (array ?? []) as NodeRole[]
    }),
  startDate: z.string().nullable().transform(transformDate),
  endDate: z.string().nullable().transform(transformDate),
})

export type SupportFileListQuery = z.output<typeof supportFileListQuerySchema>

export const queryToSearchParams = (
  query: SupportFileListQuery,
): URLSearchParams => {
  const { keyword, roles, startDate, endDate, currentPage, itemsPerPage } =
    query
  const nextSearchParams = new URLSearchParams()

  if (keyword) {
    nextSearchParams.set(SupportFileParamKeyEnum.Keyword, keyword)
  }

  roles.forEach((role) => {
    nextSearchParams.append(SupportFileParamKeyEnum.Roles, role)
  })

  if (startDate) {
    nextSearchParams.set(SupportFileParamKeyEnum.StartDate, startDate.format())
  }

  if (endDate) {
    nextSearchParams.set(SupportFileParamKeyEnum.EndDate, endDate.format())
  }

  if (currentPage) {
    nextSearchParams.set(
      SupportFileParamKeyEnum.CurrentPage,
      currentPage.toString(),
    )
  }

  if (itemsPerPage) {
    nextSearchParams.set(
      SupportFileParamKeyEnum.ItemsPerPage,
      itemsPerPage.toString(),
    )
  }

  return nextSearchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): SupportFileListQuery => {
  const keyword = searchParams.get(SupportFileParamKeyEnum.Keyword)
  const roles = searchParams.getAll(SupportFileParamKeyEnum.Roles)
  const startDate = searchParams.get(SupportFileParamKeyEnum.StartDate)
  const endDate = searchParams.get(SupportFileParamKeyEnum.EndDate)
  const currentPage = searchParams.get(SupportFileParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(SupportFileParamKeyEnum.ItemsPerPage)

  const parsedQuery = supportFileListQuerySchema.safeParse({
    keyword,
    roles,
    startDate,
    endDate,
    currentPage,
    itemsPerPage,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    roles: parsedQuery?.roles ?? [],
    startDate: parsedQuery?.startDate,
    endDate: parsedQuery?.endDate,
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}
