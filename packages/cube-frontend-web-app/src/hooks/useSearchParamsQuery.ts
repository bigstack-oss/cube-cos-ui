import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export type BaseQuery = Record<string, unknown>

export type UseSearchParamsQueryOptions<Query extends BaseQuery> = {
  searchParamsToQuery: (searchParams: URLSearchParams) => Query
  queryToSearchParams: (query: Query) => URLSearchParams
}

export const useSearchParamsQuery = <Query extends BaseQuery>(
  options: UseSearchParamsQueryOptions<Query>,
) => {
  const { queryToSearchParams, searchParamsToQuery } = options
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState<Query>(() =>
    searchParamsToQuery(searchParams),
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextSearchParams = queryToSearchParams(query)
      setSearchParams(nextSearchParams, { replace: true })
    }, 250)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, queryToSearchParams, setSearchParams])

  return {
    query,
    setQuery,
  }
}
