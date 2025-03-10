export const itemsPerPageOptions = [10, 20, 30, 50, 100] as const

export type ItemsPerPage = (typeof itemsPerPageOptions)[number]

export const DEFAULT_ITEMS_PER_PAGE = 10 as ItemsPerPage
