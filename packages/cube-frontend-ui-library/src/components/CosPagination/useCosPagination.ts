import { useState } from 'react'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from './cosPaginationUtils'

type UseCosPaginationOptions = {
  defaultItemsPerPage?: ItemsPerPage
}

type UseCosPagination = {
  currentPage: number
  itemsPerPage: ItemsPerPage
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export const useCosPagination = (
  options: UseCosPaginationOptions = {},
): UseCosPagination => {
  const { defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE } = options

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setItemsPerPage(itemsPerPage)
  }

  return {
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
  }
}
