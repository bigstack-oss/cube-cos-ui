import { Node } from '@cube-frontend/api'
import { ItemsPerPage } from '@cube-frontend/ui-library'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  modifiedOptions,
  queryToSearchParams,
  searchParamsToQuery,
} from './tuningsUtils'

type UseListTuningsQuery = {
  query: ListTuningsQuery
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onModifiedItemClick: (modified: boolean) => void
  onModifiedAllCheckChange: (checked: boolean) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export type ListTuningsQuery = {
  keyword: string
  modified: boolean[]
  hosts: string[]
  currentPage: number
  itemsPerPage: ItemsPerPage
}

export const useListTuningsQuery = (): UseListTuningsQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState<ListTuningsQuery>(() =>
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
  }, [query, setSearchParams])

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setQuery((prev) => ({
      ...prev,
      keyword: value,
      currentPage: 1,
    }))
  }

  const onKeywordClear = (): void => {
    setQuery((prev) => ({
      ...prev,
      keyword: '',
      currentPage: 1,
    }))
  }

  const onModifiedItemClick = (modified: boolean): void => {
    const { modified: modifiedArray } = query

    let nextModified: boolean[] = []
    if (modifiedArray.includes(modified)) {
      nextModified = modifiedArray.filter((value) => value !== modified)
    } else {
      nextModified = [...modifiedArray, modified]
    }

    setQuery((prev) => ({
      ...prev,
      modified: nextModified,
      currentPage: 1,
    }))
  }

  const onModifiedAllCheckChange = (checked: boolean): void => {
    setQuery((prev) => ({
      ...prev,
      modified: checked ? [...modifiedOptions] : [],
      currentPage: 1,
    }))
  }

  const onNodeItemClick = (node: Node): void => {
    const { hostname } = node
    const isSelected = query.hosts.includes(hostname)
    setQuery((prev) => ({
      ...prev,
      hosts: isSelected
        ? prev.hosts.filter((host) => host !== hostname)
        : [...prev.hosts, hostname],
      currentPage: 1,
    }))
  }

  const onNodesAllCheckChange = (nodes: Node[]): void => {
    const hosts = nodes.map((node) => node.hostname)
    setQuery((prev) => ({
      ...prev,
      hosts,
      currentPage: 1,
    }))
  }

  const onPageChange = (page: number): void => {
    setQuery((prev) => ({
      ...prev,
      currentPage: page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setQuery((prev) => ({
      ...prev,
      itemsPerPage,
      currentPage: 1,
    }))
  }

  return {
    query,
    onKeywordChange,
    onKeywordClear,
    onModifiedItemClick,
    onModifiedAllCheckChange,
    onNodeItemClick,
    onNodesAllCheckChange,
    onPageChange,
    onItemsPerPageChange,
  }
}
