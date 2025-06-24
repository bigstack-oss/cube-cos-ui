export const itemsPerPageOptions = [25, 50, 75, 100, 200] as const

export type ItemsPerPage = (typeof itemsPerPageOptions)[number]

export const DEFAULT_ITEMS_PER_PAGE = 25 as ItemsPerPage
