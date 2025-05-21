import { GetNodesRolesEnum } from '@cube-frontend/api'
import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import { queryToSearchParams, searchParamsToQuery } from './utils'

export const useNodeListQuery = () => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

  const onRolesChange = (roles: GetNodesRolesEnum[]) => {
    setQuery((prev) => ({
      ...prev,
      roles,
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
    onRolesChange,
    onPageChange,
    onItemsPerPageChange,
  }
}
