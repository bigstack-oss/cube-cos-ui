import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import { queryToSearchParams, searchParamsToQuery } from './utils'

export const useListTriggerQuery = () => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

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
    onPageChange,
    onItemsPerPageChange,
  }
}
