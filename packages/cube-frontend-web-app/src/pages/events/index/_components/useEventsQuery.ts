import { GetEventsTypeEnum } from '@cube-frontend/api'
import { DatePickerDates, ItemsPerPage } from '@cube-frontend/ui-library'
import { EventsQuery, queryToSearchParams, searchParamsToQuery } from './utils'
import { useSearchParamsQuery } from '@cube-frontend/web-app/hooks/useSearchParamsQuery'

export type FilterKeys = Extract<
  keyof EventsQuery,
  'categories' | 'severities' | 'hosts' | 'instances'
>

export type FilterOptions = {
  [K in FilterKeys]: NonNullable<EventsQuery[K]>
}

type UseEventsQuery = {
  eventsQuery: EventsQuery
  onTypeChange: (type: GetEventsTypeEnum) => void
  onKeywordChange: (keyword: string) => void
  onDatesChange: (dates: DatePickerDates) => void
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: string,
  ) => void
  onFieldAllCheckChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key],
  ) => void
  onFieldClear: <Key extends keyof FilterOptions>(key: Key) => void
  onPageNumChange: (pageNum: number) => void
  onPageSizeChange: (pageSize: ItemsPerPage) => void
}

export const useEventsQuery = (): UseEventsQuery => {
  const { query, setQuery } = useSearchParamsQuery({
    queryToSearchParams,
    searchParamsToQuery,
  })

  const onTypeChange = (type: GetEventsTypeEnum): void => {
    setQuery((prev) => ({
      ...prev,
      type,
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

  const onDatesChange = (dates: DatePickerDates): void => {
    setQuery((prev) => ({
      ...prev,
      startDate: dates.start,
      endDate: dates.end,
      currentPage: 1,
    }))
  }

  const onFieldChange = <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key][number],
  ): void => {
    setQuery((prev) => {
      const currentValues = prev[key] as string[]

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

      return {
        ...prev,
        [key]: nextValues,
        currentPage: 1,
      }
    })
  }

  const onFieldAllCheckChange = <Key extends keyof FilterOptions>(
    key: Key,
    options: FilterOptions[Key],
  ): void => {
    setQuery((prev) => ({
      ...prev,
      [key]: options,
      currentPage: 1,
    }))
  }

  const onFieldClear = <Key extends keyof FilterOptions>(key: Key): void => {
    setQuery((prev) => ({
      ...prev,
      [key]: [],
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
    eventsQuery: query,
    onTypeChange,
    onKeywordChange,
    onDatesChange,
    onFieldChange,
    onFieldAllCheckChange,
    onFieldClear,
    onPageNumChange: onPageChange,
    onPageSizeChange: onItemsPerPageChange,
  }
}
