import { z } from 'zod'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'

export const paginationQuerySchema = z.object({
  currentPage: z
    .string()
    .nullable()
    .transform((value) => {
      return value ? parseInt(value, 10) : 1
    }),
  itemsPerPage: z
    .string()
    .nullable()
    .transform((value) => {
      if (!value) {
        return DEFAULT_ITEMS_PER_PAGE
      }
      return parseInt(value, 10) as ItemsPerPage
    }),
})

export type PaginationQuery = z.output<typeof paginationQuerySchema>
