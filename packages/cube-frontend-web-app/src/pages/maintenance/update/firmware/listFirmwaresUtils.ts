import { ListFirmwaresResponseDataFirmwaresInner } from '@cube-frontend/api'
import {
  CosTableRow,
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'

enum FirmwareParamKeyEnum {
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export type ListFirmwaresQuery = {
  [FirmwareParamKeyEnum.CurrentPage]: number
  [FirmwareParamKeyEnum.ItemsPerPage]: ItemsPerPage
}

export const queryToSearchParams = (
  query: ListFirmwaresQuery,
): URLSearchParams => {
  const searchParams = new URLSearchParams()
  searchParams.set(FirmwareParamKeyEnum.CurrentPage, query.page.toString())
  searchParams.set(FirmwareParamKeyEnum.ItemsPerPage, query.pageSize.toString())
  return searchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): ListFirmwaresQuery => {
  const currentPage = searchParams.get(FirmwareParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(FirmwareParamKeyEnum.ItemsPerPage)

  const parsedQuery = paginationQuerySchema.safeParse({
    currentPage,
    itemsPerPage,
  }).data

  return {
    page: parsedQuery?.currentPage ?? 1,
    pageSize: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

export type FirmwareRow = CosTableRow & ListFirmwaresResponseDataFirmwaresInner

export const firmwareToRow = (
  firmware: ListFirmwaresResponseDataFirmwaresInner,
): FirmwareRow => ({
  ...firmware,
  id: firmware.version,
})
