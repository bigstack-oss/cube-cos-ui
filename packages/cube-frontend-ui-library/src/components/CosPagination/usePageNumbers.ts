type GetPageNumbersProps = {
  totalPages: number
  currentPage: number
}

export type PageNumbers = 'ellipsis' | number

const MAX_DISPLAY_PAGE = 7

export const usePageNumbers = (props: GetPageNumbersProps): PageNumbers[] => {
  const { totalPages, currentPage } = props

  const pageNumbers: PageNumbers[] = []

  pageNumbers.push(1)

  if (totalPages <= MAX_DISPLAY_PAGE) {
    for (let i = 2; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else if (totalPages === 8) {
    if (currentPage <= 4) {
      pageNumbers.push(2, 3, 4, 5)
      pageNumbers.push('ellipsis')
      pageNumbers.push(totalPages)
    } else {
      pageNumbers.push('ellipsis')
      pageNumbers.push(4, 5, 6, 7)
      pageNumbers.push(totalPages)
    }
  } else {
    if (currentPage <= 4) {
      // Current page is near the beginning
      pageNumbers.push(2, 3, 4, 5)
      pageNumbers.push('ellipsis')
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - 3) {
      // Current page is near the end
      pageNumbers.push('ellipsis')
      pageNumbers.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      )
      pageNumbers.push(totalPages)
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
