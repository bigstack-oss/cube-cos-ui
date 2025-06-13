import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import {
  GetLicensesProductsEnum,
  GetLicensesTypesEnum,
  ListLicenseCurrentStatus,
} from '@cube-frontend/api'
import { queryToSearchParams, searchParamsToQuery } from './utils'

export const useLicenseListQuery = () => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

  const onProductsChange = (products: GetLicensesProductsEnum[]) => {
    setQuery((prev) => ({
      ...prev,
      products,
      currentPage: 1,
    }))
  }

  const onStatusesChange = (statuses: ListLicenseCurrentStatus[]) => {
    setQuery((prev) => ({
      ...prev,
      statuses,
      currentPage: 1,
    }))
  }

  const onTypesChange = (types: GetLicensesTypesEnum[]) => {
    setQuery((prev) => ({
      ...prev,
      types,
      currentPage: 1,
    }))
  }

  const onKeywordChange = (value: string): void => {
    setQuery((prev) => ({
      ...prev,
      keyword: value,
      currentPage: 1,
    }))
  }

  const onPageChange = (page: number): void => {
    setQuery((prev) => ({
      ...prev,
      currentPage: page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setQuery((prev) => ({
      ...prev,
      itemsPerPage,
      currentPage: 1,
    }))
  }

  return {
    query,
    setQuery,
    onKeywordChange,
    onProductsChange,
    onStatusesChange,
    onTypesChange,
    onPageChange,
    onItemsPerPageChange,
  }
}
