import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { isEmpty } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'

const isValidEventsType = (type: string | null): boolean => {
  return Object.values(GetEventsTypeEnum).includes(
    type as unknown as GetEventsTypeEnum,
  )
}

const getValidEventsType = (
  searchParams: URLSearchParams,
): GetEventsTypeEnum => {
  const urlEventsType = searchParams.get('eventsType')

  if (!urlEventsType || !isValidEventsType(urlEventsType)) {
    return GetEventsTypeEnum.System
  }

  return urlEventsType as GetEventsTypeEnum
}

const DEFAULT_PAGE = 1

export type UseEventsQuery = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (type: GetEventsTypeEnum) => void
  handleEventsQueryChange: (updates: Record<string, string | null>) => void
  handleEventsQueryReset: () => void
  handleCurrentPageChange: (page: number) => void
  handlePageSizeChange: (itemsPerPage: ItemsPerPage) => void
  getCurrentQuery: () => {
    eventsFilter: Record<string, string>
    /**
     * Checks whether the filter is empty, excluding the `eventsType` field.
     */
    isEventsFilterEmpty: boolean
  }
}

export const useEventsQuery = (): UseEventsQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [eventsType, setEventsType] = useState<GetEventsTypeEnum>(
    getValidEventsType(searchParams),
  )

  useEffect(() => {
    const urlEventsType = searchParams.get('eventsType')

    if (urlEventsType !== eventsType) {
      const validEventsType = getValidEventsType(searchParams)
      setEventsType(validEventsType)
      setSearchParams(
        {
          eventsType: validEventsType,
          page: DEFAULT_PAGE.toString(),
          size: DEFAULT_ITEMS_PER_PAGE.toString(),
        },
        { replace: true },
      )
    }
  }, [eventsType, searchParams, setSearchParams])

  const handleEventsTypeChange = (type: GetEventsTypeEnum) => {
    setSearchParams(
      {
        eventsType: type,
        page: DEFAULT_PAGE.toString(),
        size: DEFAULT_ITEMS_PER_PAGE.toString(),
      },
      { replace: true },
    )
  }

  const handleEventsQueryChange = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    newParams.set('page', DEFAULT_PAGE.toString())
    newParams.set('size', DEFAULT_ITEMS_PER_PAGE.toString())

    setSearchParams(newParams, { replace: true })
  }

  const handleEventsQueryReset = () => {
    const currentSize =
      searchParams.get('size') ?? DEFAULT_ITEMS_PER_PAGE.toString()
    const newParams = new URLSearchParams()
    newParams.set('eventsType', eventsType)
    newParams.set('page', DEFAULT_PAGE.toString())
    newParams.set('size', currentSize)
    setSearchParams(newParams, { replace: true })
  }

  const handleCurrentPageChange = (page: number): void => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  const handlePageSizeChange = (itemsPerPage: ItemsPerPage) => {
    searchParams.set('size', itemsPerPage.toString())
    searchParams.set('page', DEFAULT_PAGE.toString())
    setSearchParams(searchParams)
  }

  const getCurrentQuery = () => {
    const eventsFilter = Object.fromEntries(searchParams)
    const { eventsType, size, page, ...restFilter } = eventsFilter
    const isFilterEmpty = isEmpty(restFilter)

    return {
      eventsFilter,
      isEventsFilterEmpty: isFilterEmpty,
    }
  }

  return {
    eventsType,
    handleEventsTypeChange,
    handleEventsQueryChange,
    handleEventsQueryReset,
    handleCurrentPageChange,
    handlePageSizeChange,
    getCurrentQuery,
  }
}
