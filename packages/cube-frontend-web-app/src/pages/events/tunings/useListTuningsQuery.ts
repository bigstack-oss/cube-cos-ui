import { Node } from '@cube-frontend/api'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'

type UseListTuningsQuery = {
  query: ListTuningsQuery
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onModifyStatusItemClick: (value: boolean | undefined) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
}

export type ListTuningsQuery = {
  keyword: string
  selectedModified: [boolean | undefined]
  hosts: string[]
  currentPage: number
  itemsPerPage: ItemsPerPage
}

export const useListTuningsQuery = (): UseListTuningsQuery => {
  const [query, setQuery] = useState<ListTuningsQuery>(() => ({
    keyword: '',
    selectedModified: [undefined],
    hosts: [],
    currentPage: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }))

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

  const onModifyStatusItemClick = (modified: boolean | undefined): void => {
    setQuery((prev) => ({
      ...prev,
      selectedModified: [modified],
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
      currentPage: 1,
      itemsPerPage,
    }))
  }

  return {
    query,
    onKeywordChange,
    onKeywordClear,
    onModifyStatusItemClick,
    onNodeItemClick,
    onNodesAllCheckChange,
    onPageChange,
    onItemsPerPageChange,
  }
}
