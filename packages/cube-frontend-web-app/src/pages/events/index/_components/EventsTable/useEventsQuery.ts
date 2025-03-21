import { useSearchParams } from 'react-router'
import { isEmpty } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { useEffect, useState } from 'react'

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

export type UseEventsQuery = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (type: GetEventsTypeEnum) => void
  handleEventsQueryChange: (updates: Record<string, string | null>) => void
  handleEventsQueryReset: () => void
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
      setSearchParams({ eventsType: validEventsType }, { replace: true })
    }
  }, [eventsType, searchParams, setSearchParams])

  const handleEventsTypeChange = (type: GetEventsTypeEnum) => {
    setSearchParams({ eventsType: type }, { replace: true })
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
    setSearchParams(newParams, { replace: true })
  }

  const handleEventsQueryReset = () => {
    const newParams = new URLSearchParams()
    newParams.set('eventsType', eventsType)
    setSearchParams(newParams, { replace: true })
  }

  const getCurrentQuery = () => {
    const eventsFilter = Object.fromEntries(searchParams)
    const { eventsType, ...restFilter } = eventsFilter
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
    getCurrentQuery,
  }
}
