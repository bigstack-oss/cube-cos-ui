export type showLoadingDisplayOptions = {
  isLoading: boolean
  isPolling: boolean
  hasResponseBeenReceived: boolean
}

/**
 * There are 4 types of loading scenarios and their suitable loading display:
 * 1. First-time loading => Skeleton
 * 2. Manually revalidation after create/update/delete page data => Skeleton
 * 3. Filter/Dropdown/Search/Pagination changes => Skeleton
 * 4. Polling => update data silently without any UI indication
 *
 * This functions handle the loading display logic based on the above scenarios.
 */
export const shouldDisplayLoading = (options: showLoadingDisplayOptions) => {
  const { isLoading, isPolling, hasResponseBeenReceived } = options

  return !hasResponseBeenReceived || (isLoading && !isPolling)
}
