import { Node } from '@cube-frontend/api'
import { CosDropdown, CosInput } from '@cube-frontend/ui-library'
import Search from '@cube-frontend/ui-library/icons/monochrome/search.svg?react'
import { ChangeEvent } from 'react'
import { HostDropdown } from './HostDropdown'
import { TuningsFilterValue } from './useTuningsFilter'

const modifyStatuses: boolean[] = [true, false]

type TuningsFilterProps = {
  filter: TuningsFilterValue
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onModifyStatusItemClick: (value: boolean) => void
  onNodeItemClick: (node: Node) => void
  onNodesAllCheckChange: (nodes: Node[]) => void
}

const modifiedToText = (modified: boolean | undefined): string => {
  if (modified === undefined) {
    return ''
  }
  if (modified) {
    return 'Modified'
  }
  return 'Unmodified'
}

export const TuningsFilter = (props: TuningsFilterProps) => {
  const {
    filter,
    onKeywordChange,
    onModifyStatusItemClick,
    onNodeItemClick,
    onNodesAllCheckChange: onNodesAllCheckChangeProp,
  } = props

  return (
    <div className="flex items-center gap-x-2">
      <CosInput
        className="h-[34px] bg-grey-100"
        placeholder="Search"
        value={filter.keyword}
        trailingIcon={<Search className="icon-sm text-functional-text" />}
        onChange={onKeywordChange}
      />
      <CosDropdown selectedItems={filter.selectedModified}>
        <CosDropdown.Trigger
          className="h-[34px] w-40"
          placeholder="Modify Status"
        >
          {modifiedToText(filter.selectedModified[0])}
        </CosDropdown.Trigger>
        <CosDropdown.Menu>
          {modifyStatuses.map((modified) => {
            const text = modifiedToText(modified)
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
        selectedHosts={filter.hosts}
        onItemClick={onNodeItemClick}
        onAllCheckChange={onNodesAllCheckChangeProp}
      />
    </div>
  )
}
