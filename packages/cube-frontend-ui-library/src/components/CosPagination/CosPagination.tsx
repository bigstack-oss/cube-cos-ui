import { useState } from 'react'
import ChevronLeft from '../../components/CosIcon/monochrome/chevron_left.svg?react'
import ChevronLeftEnd from '../../components/CosIcon/monochrome/chevron_left_end.svg?react'
import ChevronRight from '../../components/CosIcon/monochrome/chevron_right.svg?react'
import ChevronRightEnd from '../../components/CosIcon/monochrome/chevron_right_end.svg?react'
import { CosPaginationAmount } from './CosPaginationAmount'
import { CosPaginationGoToPageInput } from './CosPaginationGoToPageInput'
import { CosPaginationItemButton } from './CosPaginationItemButton'
import { CosPaginationItemWrap } from './CosPaginationItemWrap'
import { CosPaginationSkeleton } from './CosPaginationSkeleton'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from './cosPaginationUtils'
import { CosPaginationViewDropdown } from './CosPaginationViewDropdown'
import { getPageNumbers } from './utils'

export type CosPaginationProps = {
  isLoading?: boolean
  totalItems: number
  /**
   * The current page is 1-indexed
   * i.e., the first page is 1, not 0
   */
  currentPage: number
  /**
   * @default 10
   */
  itemsPerPage: ItemsPerPage
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: ItemsPerPage) => void
}

export const CosPagination = (props: CosPaginationProps) => {
  const {
    isLoading = false,
    totalItems,
    currentPage = 1,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    onPageChange,
    onItemsPerPageChange,
  } = props

  const [inputPage, setInputPage] = useState('')

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page)
    }
  }

  const handleGoToPage = () => {
    const page = parseInt(inputPage)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange?.(page)
      setInputPage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage()
    }
  }

  const handleItemsPerPageChange = (num: ItemsPerPage) => {
    onItemsPerPageChange?.(num)
    handlePageChange(1)
  }

  const pageNumbers = getPageNumbers({ totalPages, currentPage })

  if (isLoading) return <CosPaginationSkeleton />

  return (
    <div className="flex items-center justify-between">
      <CosPaginationAmount totalItems={totalItems} />
      <div className="flex items-center">
        <CosPaginationItemButton
          type="icon"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <ChevronLeftEnd className="icon-md" />
        </CosPaginationItemButton>
        <CosPaginationItemButton
          type="icon"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="icon-md" />
        </CosPaginationItemButton>
        {pageNumbers.map((page, index) => {
          return page === 'ellipsis' ? (
            <CosPaginationItemWrap key={`${page}-${index}`}>
              ...
            </CosPaginationItemWrap>
          ) : (
            <CosPaginationItemButton
              key={`${page}-${index}`}
              type="number"
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </CosPaginationItemButton>
          )
        })}
        <CosPaginationItemButton
          type="icon"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="icon-md" />
        </CosPaginationItemButton>
        <CosPaginationItemButton
          type="icon"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          <ChevronRightEnd className="icon-md" />
        </CosPaginationItemButton>
        <CosPaginationGoToPageInput
          placeholder="Page"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleGoToPage}
        />
      </div>
      <CosPaginationViewDropdown
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  )
}
