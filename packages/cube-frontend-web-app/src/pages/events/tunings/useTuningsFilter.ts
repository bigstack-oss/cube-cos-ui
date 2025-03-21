import { Node } from '@cube-frontend/api'
import { ChangeEvent, useState } from 'react'

type UseTuningsFilter = {
  filter: TuningsFilterValue
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onModifyStatusItemClick: (value: boolean) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
}

export type TuningsFilterValue = {
  keyword: string
  selectedModified: [] | [boolean]
  hosts: string[]
}

export const useTuningFilters = (): UseTuningsFilter => {
  const [filter, setFilter] = useState<TuningsFilterValue>(() => ({
    keyword: '',
    selectedModified: [],
    hosts: [],
  }))

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      keyword: value,
    }))
  }

  const onModifyStatusItemClick = (value: boolean): void => {
    const nextSelectedModified: [] | [boolean] = (
      filter.selectedModified as boolean[]
    ).includes(value)
      ? []
      : [value]
    setFilter((prev) => ({
      ...prev,
      selectedModified: nextSelectedModified,
    }))
  }

  const onNodeItemClick = (node: Node): void => {
    const { hostname } = node
    const isSelected = filter.hosts.includes(hostname)
    setFilter((prev) => ({
      ...prev,
      hosts: isSelected
        ? prev.hosts.filter((host) => host !== hostname)
        : [...prev.hosts, hostname],
    }))
  }

  const onNodesAllCheckChange = (nodes: Node[]): void => {
    const hosts = nodes.map((node) => node.hostname)
    setFilter((prev) => ({
      ...prev,
      hosts,
    }))
  }

  return {
    filter,
    onKeywordChange,
    onModifyStatusItemClick,
    onNodeItemClick,
    onNodesAllCheckChange,
  }
}
