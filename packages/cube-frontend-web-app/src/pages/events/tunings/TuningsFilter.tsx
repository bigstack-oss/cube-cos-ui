import { Node } from '@cube-frontend/api'
import { CosDropdown, CosSearchBarFilter } from '@cube-frontend/ui-library'
import { ChangeEvent } from 'react'
import { HostDropdown } from './HostDropdown'
import { ListTuningsQuery } from './useListTuningsQuery'

const modifyStatuses = [undefined, true, false] as const

type TuningsFilterProps = {
  query: ListTuningsQuery
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onModifyStatusItemClick: (modified: boolean | undefined) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
}

const modifiedTriggerText = (modified: boolean | undefined): string => {
  if (modified === undefined) {
    return 'Modify Status'
  }
  return modifiedOptionText(modified)
}

const modifiedOptionText = (modified: boolean | undefined): string => {
  if (modified === undefined) {
    return 'Any'
  }
  if (modified) {
    return 'Modified'
  }
  return 'Unmodified'
}

export const TuningsFilter = (props: TuningsFilterProps) => {
  const {
    query,
    onKeywordChange,
    onKeywordClear,
    onModifyStatusItemClick,
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
      <CosDropdown selectedItems={query.selectedModified}>
        <CosDropdown.Trigger
          className="h-[34px] w-40"
          placeholder="Modify Status"
        >
          {modifiedTriggerText(query.selectedModified[0])}
        </CosDropdown.Trigger>
        <CosDropdown.Menu>
          {modifyStatuses.map((modified) => {
            const text = modifiedOptionText(modified)
            return (
              <CosDropdown.Item
                key={text}
                item={modified}
                onClick={() => onModifyStatusItemClick(modified)}
              >
                {text}
              </CosDropdown.Item>
            )
          })}
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
