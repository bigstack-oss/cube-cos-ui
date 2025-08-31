import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
import {
  CosTableRow,
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'

enum FixpackParamKeyEnum {
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export type ListFixpacksQuery = {
  [FixpackParamKeyEnum.CurrentPage]: number
  [FixpackParamKeyEnum.ItemsPerPage]: ItemsPerPage
}

export const queryToSearchParams = (
  query: ListFixpacksQuery,
): URLSearchParams => {
  const searchParams = new URLSearchParams()
  searchParams.set(FixpackParamKeyEnum.CurrentPage, query.page.toString())
  searchParams.set(FixpackParamKeyEnum.ItemsPerPage, query.pageSize.toString())
  return searchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): ListFixpacksQuery => {
  const currentPage = searchParams.get('pageNum')
  const itemsPerPage = searchParams.get('pageSize')

  const parsedQuery = paginationQuerySchema.safeParse({
    currentPage,
    itemsPerPage,
  }).data

  return {
    page: parsedQuery?.currentPage ?? 1,
    pageSize: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

export type FixpackRow = CosTableRow & ListFixpacksResponseDataFixpacksInner

export const fixpackToRow = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
): FixpackRow => ({
  ...fixpack,
  id: fixpack.version,
})
