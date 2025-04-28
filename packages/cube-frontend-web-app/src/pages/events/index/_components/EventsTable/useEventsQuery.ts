import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Dayjs } from 'dayjs'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { DatePickerDates, ItemsPerPage } from '@cube-frontend/ui-library'
import { initEventsQuery } from './utils'

export type FilterKeys = Extract<
  keyof EventsQuery,
  'category' | 'severity' | 'host' | 'instance'
>

export type FilterOptions = {
  [K in FilterKeys]: NonNullable<EventsQuery[K]>
}

type UseEventsQuery = {
  eventsQuery: EventsQuery
  onTypeChange: (type: GetEventsTypeEnum) => void
  onKeywordChange: (keyword: string) => void
  onDatesChange: (dates: DatePickerDates) => void
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key] | undefined,
  ) => void
  onPageNumChange: (pageNum: number) => void
  onPageSizeChange: (pageSize: ItemsPerPage) => void
}

export type EventsQuery = {
  type: GetEventsTypeEnum
  keyword: string
  category: string | undefined
  start: Dayjs | undefined
  stop: Dayjs | undefined
  pageSize: ItemsPerPage
  pageNum: number
  // System
  severity: string | undefined
  // Host
  host: string | undefined
  // Instance
  instance: string | undefined
}

export const useEventsQuery = (): UseEventsQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [eventsQuery, setEventsQuery] = useState<EventsQuery>(() =>
    initEventsQuery(searchParams),
  )

  useEffect(() => {
    const record = Object.entries(eventsQuery).reduce(
      (result, [key, value]) => {
        const stringValue = value?.toString()
        if (stringValue) {
          result[key] = stringValue
        }
        return result
      },
      {} as Record<string, string>,
    )

    setSearchParams(record, {
      replace: true,
    })
  }, [eventsQuery, setSearchParams])

  const onTypeChange = (type: GetEventsTypeEnum): void => {
    setEventsQuery((prev) => ({
      ...prev,
      type,
      pageNum: 1,
    }))
  }

  const onKeywordChange = (keyword: string): void => {
    setEventsQuery((prev) => ({
      ...prev,
      keyword,
      pageNum: 1,
    }))
  }

  const onDatesChange = (dates: DatePickerDates): void => {
    setEventsQuery((prev) => ({
      ...prev,
      start: dates.start,
      stop: dates.end,
      pageNum: 1,
    }))
  }

  const onFieldChange = <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key] | undefined,
  ): void => {
    setEventsQuery((prev) => ({
      ...prev,
      [key]: value,
      pageNum: 1,
    }))
  }

  const onPageNumChange = (pageNum: number): void => {
    setEventsQuery((prev) => ({
      ...prev,
      pageNum,
    }))
  }

  const onPageSizeChange = (pageSize: ItemsPerPage): void => {
    setEventsQuery((prev) => ({
      ...prev,
      pageSize,
      pageNum: 1,
    }))
  }

  return {
    eventsQuery,
    onTypeChange,
    onKeywordChange,
    onDatesChange,
    onFieldChange,
    onPageNumChange,
    onPageSizeChange,
  }
}
