import { Node } from '@cube-frontend/api'
import { CosDropdown, CosSearchBarFilter } from '@cube-frontend/ui-library'
import { ChangeEvent } from 'react'
import { HostDropdown } from './HostDropdown'
import { modifiedOptions } from './tuningsUtils'
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
        placeholder="Search"
        value={query.keyword}
        showDropdown={false}
        onChange={onKeywordChange}
        onInputClear={onKeywordClear}
      />
      <CosDropdown
        type="checkbox"
        selectedItems={query.modified}
        onAllCheckChange={onModifiedAllCheckChange}
      >
        <CosDropdown.Trigger
          className="h-[34px] w-[168px]"
          placeholder="Modify Statuses"
        >
          {query.modified.length ? 'Modify Statuses' : undefined}
        </CosDropdown.Trigger>
        <CosDropdown.Menu>
          {modifiedOptions.map((modified) => (
            <CosDropdown.Item
              key={modified.toString()}
              item={modified}
              onClick={() => onModifiedItemClick(modified)}
            >
              {modified ? 'Modified' : 'Unmodified'}
            </CosDropdown.Item>
          ))}
        </CosDropdown.Menu>
      </CosDropdown>
      <HostDropdown
        selectedHosts={query.hosts}
        onItemClick={onNodeItemClick}
        onAllCheckChange={onNodesAllCheckChangeProp}
      />
    </div>
  )
}
