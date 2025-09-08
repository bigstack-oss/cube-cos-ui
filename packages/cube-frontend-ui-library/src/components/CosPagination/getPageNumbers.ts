type PageInfo = {
  totalPages: number
  currentPage: number
}

export type PageNumbers = 'ellipsis' | number

const MAX_DISPLAY_PAGE_GENERAL = 7

const getPageNumbersGeneral = (props: PageInfo): PageNumbers[] => {
  const { totalPages, currentPage } = props

  const pageNumbers: PageNumbers[] = []

  pageNumbers.push(1)

  if (totalPages <= MAX_DISPLAY_PAGE_GENERAL) {
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

const MAX_DISPLAY_PAGE_MINIMAL = 5

const getPageNumbersMinimal = (props: PageInfo): PageNumbers[] => {
  const { totalPages, currentPage } = props
  const pageNumbers: PageNumbers[] = []

  if (totalPages === 0) {
    return [1]
  }

  if (totalPages <= MAX_DISPLAY_PAGE_MINIMAL) {
    // Small number of pages → just show all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  if (currentPage <= 2) {
    // Near the start
    pageNumbers.push(1, 2, 3, 'ellipsis', totalPages)
  } else if (currentPage >= totalPages - 1) {
    // Near the end
    pageNumbers.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages)
  } else {
    // Middle range
    pageNumbers.push(
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
    )
  }

  return pageNumbers
}

type GetPageNumbersProps = PageInfo & {
  isMinimal: boolean
}

export const getPageNumbers = (props: GetPageNumbersProps): PageNumbers[] => {
  const { isMinimal, ...restProps } = props

  if (isMinimal) {
    return getPageNumbersMinimal(restProps)
  } else {
    return getPageNumbersGeneral(restProps)
  }
}
