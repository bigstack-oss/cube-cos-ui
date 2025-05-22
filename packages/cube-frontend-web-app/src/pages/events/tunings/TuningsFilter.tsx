import { Node } from '@cube-frontend/api'
import { CosSearchBarFilter } from '@cube-frontend/ui-library'
import { ChangeEvent } from 'react'
import { HostDropdown } from './HostDropdown'
import { ModifiedStatusDropdown } from './ModifiedStatusDropdown'
import { ListTuningsQuery } from './useListTuningsQuery'

type TuningsFilterProps = {
  query: ListTuningsQuery
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onModifiedItemClick: (modified: boolean) => void
  onModifiedAllCheckChange: (checked: boolean) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
}

export const TuningsFilter = (props: TuningsFilterProps) => {
  const {
    query,
    onKeywordChange,
    onKeywordClear,
    onModifiedItemClick,
    onModifiedAllCheckChange,
    onNodeItemClick,
    onNodesAllCheckChange: onNodesAllCheckChangeProp,
  } = props

  return (
    <div className="flex items-center gap-x-2">
      <CosSearchBarFilter
        value={query.keyword}
        showDropdown={false}
        onChange={onKeywordChange}
        onInputClear={onKeywordClear}
      />
      <ModifiedStatusDropdown
        selectedModified={query.modified}
        onItemClick={onModifiedItemClick}
        onAllCheckChange={onModifiedAllCheckChange}
      />
      <HostDropdown
        selectedHosts={query.hosts}
        onItemClick={onNodeItemClick}
        onAllCheckChange={onNodesAllCheckChangeProp}
      />
    </div>
  )
}
