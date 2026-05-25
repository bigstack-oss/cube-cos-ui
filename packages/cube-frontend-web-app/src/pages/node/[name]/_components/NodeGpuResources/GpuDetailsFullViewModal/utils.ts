import { ItemsPerPage } from '@cube-frontend/ui-library'

export const getItemsInView = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: ItemsPerPage,
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = currentPage * itemsPerPage

  return items.slice(startIndex, endIndex)
}
