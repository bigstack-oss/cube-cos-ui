type GetPageNumbersProps = {
  totalPages: number
  currentPage: number
}

export type PageNumbers = 'ellipsis' | number

const MAX_DISPLAY_PAGE = 7

export const getPageNumbers = (props: GetPageNumbersProps): PageNumbers[] => {
  const { totalPages, currentPage } = props

  const pageNumbers: PageNumbers[] = []

  pageNumbers.push(1)

  if (totalPages <= MAX_DISPLAY_PAGE) {
    for (let i = 2; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      // Current page is near the beginning
      pageNumbers.push(2, 3)
      pageNumbers.push('ellipsis')
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Current page is near the end
      pageNumbers.push(2, 3)
      pageNumbers.push('ellipsis')
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages)
    } else {
      // Current page is in the middle
      pageNumbers.push('ellipsis')
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1)
      pageNumbers.push('ellipsis')
      pageNumbers.push(totalPages)
    }
  }

  return pageNumbers
}
