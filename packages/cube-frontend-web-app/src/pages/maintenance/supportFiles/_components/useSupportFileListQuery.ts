import { Dayjs } from 'dayjs'
import { NodeRole } from '@cube-frontend/api'
import { ItemsPerPage } from '@cube-frontend/ui-library'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'
import {
  queryToSearchParams,
  searchParamsToQuery,
  SupportFileListQuery,
} from './utils'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'

export const useSupportFileListQuery = () => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(
    query.keyword,
    300,
  )

  const keywordDebouncedQuery: SupportFileListQuery = {
    ...query,
    keyword: debouncedKeyword,
  }

  const onRolesChange = (roles: NodeRole[]) => {
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

  const onKeywordClear = (): void => {
    setDebouncedKeyword('')
    setQuery((prev) => ({
      ...prev,
      keyword: '',
      currentPage: 1,
    }))
  }

  const onStartDateChange = (date: Dayjs | undefined): void => {
    setQuery((prev) => ({
      ...prev,
      startDate: date,
      currentPage: 1,
    }))
  }
  const onEndDateChange = (date: Dayjs | undefined): void => {
    setQuery((prev) => ({
      ...prev,
      endDate: date,
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
    keywordDebouncedQuery,
    setQuery,
    onStartDateChange,
    onEndDateChange,
    onKeywordChange,
    onKeywordClear,
    onRolesChange,
    onPageChange,
    onItemsPerPageChange,
  }
}
