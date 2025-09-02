import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import {
  ListFixpacksQuery,
  queryToSearchParams,
  searchParamsToQuery,
} from './listFixpacksUtils'

type UseListFixpacksQuery = {
  query: ListFixpacksQuery
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export const useListFixpacksQuery = (): UseListFixpacksQuery => {
  const { query, setQuery } = useSearchParamsQuery({
    searchParamsToQuery,
    queryToSearchParams,
  })

  const onPageChange = (page: number): void => {
    setQuery((prev) => ({
      ...prev,
      pageNum: page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setQuery((prev) => ({
      ...prev,
      pageSize: itemsPerPage,
      page: 1,
    }))
  }

  return {
    query,
    onPageChange,
    onItemsPerPageChange,
  }
}
