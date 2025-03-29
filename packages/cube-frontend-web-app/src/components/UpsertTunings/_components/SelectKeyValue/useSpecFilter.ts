import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'

type UseSpecFilter = {
  filter: SpecFilterValue
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export type SpecFilterValue = {
  keyword: string
  currentPage: number
  itemsPerPage: ItemsPerPage
}

export const useSpecFilter = (): UseSpecFilter => {
  const [filter, setFilter] = useState<SpecFilterValue>(() => ({
    keyword: '',
    currentPage: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }))

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      keyword: value,
      currentPage: 1,
    }))
  }

  const onKeywordClear = (): void => {
    setFilter((prev) => ({
      ...prev,
      keyword: '',
      currentPage: 1,
    }))
  }

  const onPageChange = (page: number): void => {
    setFilter((prev) => ({
      ...prev,
      currentPage: page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setFilter((prev) => ({
      ...prev,
      currentPage: 1,
      itemsPerPage,
    }))
  }

  return {
    filter,
    onKeywordChange,
    onKeywordClear,
    onPageChange,
    onItemsPerPageChange,
  }
}
