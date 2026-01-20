import { z } from 'zod'
import { NodeRole } from '@cube-frontend/api'
import { DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'

enum NodeParamKeyEnum {
  Keyword = 'keyword',
  Roles = 'roles',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

const nodeListQuerySchema = paginationQuerySchema.extend({
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
})

export type NodeListQuery = z.output<typeof nodeListQuerySchema>

export const queryToSearchParams = (query: NodeListQuery): URLSearchParams => {
  const { keyword, roles, currentPage, itemsPerPage } = query
  const nextSearchParams = new URLSearchParams()

  if (keyword) {
    nextSearchParams.set(NodeParamKeyEnum.Keyword, keyword)
  }

  roles.forEach((role) => {
    nextSearchParams.append(NodeParamKeyEnum.Roles, role)
  })

  if (currentPage) {
    nextSearchParams.set(NodeParamKeyEnum.CurrentPage, currentPage.toString())
  }

  if (itemsPerPage) {
    nextSearchParams.set(NodeParamKeyEnum.ItemsPerPage, itemsPerPage.toString())
  }

  return nextSearchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): NodeListQuery => {
  const keyword = searchParams.get(NodeParamKeyEnum.Keyword)
  const roles = searchParams.getAll(NodeParamKeyEnum.Roles)
  const currentPage = searchParams.get(NodeParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(NodeParamKeyEnum.ItemsPerPage)

  const parsedQuery = nodeListQuerySchema.safeParse({
    keyword,
    roles,
    currentPage,
    itemsPerPage,
  }).data

  return {
    keyword: parsedQuery?.keyword ?? '',
    roles: parsedQuery?.roles ?? [],
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}
