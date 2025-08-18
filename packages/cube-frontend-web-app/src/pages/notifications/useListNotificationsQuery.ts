import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import { ListNotificationsPastEnum } from '@cube-frontend/web-app/utils/notification'
import {
  ListNotificationsQuery,
  queryToSearchParams,
  searchParamsToQuery,
} from './notificationsPageUtils'

type UseListNotificationsQuery = {
  query: ListNotificationsQuery
  debouncedKeyword: string
  onTimeRangeChange: (timeRange: ListNotificationsPastEnum) => void
  onKeywordChange: (keyword: string) => void
  onKeywordClear: () => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export const useListNotificationsQuery = (): UseListNotificationsQuery => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

  const [debouncedKeyword, setDebounceKeyword] = useDebounce(query.keyword, 300)

  const onTimeRangeChange = (timeRange: ListNotificationsPastEnum): void => {
    setQuery((prev) => ({
      ...prev,
      timeRange,
      currentPage: 1,
    }))
  }

  const onKeywordChange = (keyword: string): void => {
    setQuery((prev) => ({
      ...prev,
      keyword,
      currentPage: 1,
    }))
  }

  const onKeywordClear = () => {
    onKeywordChange('')
    setDebounceKeyword('')
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
      currentPage: 1,
      itemsPerPage,
    }))
  }

  return {
    query,
    debouncedKeyword,
    onTimeRangeChange,
    onKeywordChange,
    onKeywordClear,
    onPageChange,
    onItemsPerPageChange,
  }
}
