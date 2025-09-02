import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import {
  ListFirmwaresQuery,
  queryToSearchParams,
  searchParamsToQuery,
} from './listFirmwaresUtils'

type UseListFirmwaresQuery = {
  query: ListFirmwaresQuery
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export const useListFirmwaresQuery = (): UseListFirmwaresQuery => {
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
