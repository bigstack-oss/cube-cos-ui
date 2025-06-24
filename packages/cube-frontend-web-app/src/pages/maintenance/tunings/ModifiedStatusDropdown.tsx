import { ChangeEvent, useMemo, useState } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { modifiedOptions } from './tuningsUtils'

type ModifiedStatusDropdownProps = {
  selectedModified: boolean[]
  onItemClick: (modified: boolean) => void
  onAllCheckChange: (checked: boolean) => void
}

export const ModifiedStatusDropdown = (props: ModifiedStatusDropdownProps) => {
  const { selectedModified, onItemClick, onAllCheckChange } = props

  const [searchValue, setSearchValue] = useState('')

  const matchedStatuses = useMemo(() => {
    if (!searchValue) {
      return modifiedOptions
    }

    const loweredValue = searchValue.toLowerCase()
    return modifiedOptions.filter((modified) => {
      if (modified) {
        const modifiedString = 'modified'
        return modifiedString.includes(loweredValue)
      }

      const unmodifiedString = 'unmodified'
      return unmodifiedString.includes(loweredValue)
      return
    })
  }, [searchValue])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  const onClearClick = (): void => {
    onAllCheckChange(false)
  }

  return (
    <CosDropdown
      type="search-checkbox"
      selectedItems={selectedModified}
      searchValue={searchValue}
      onAllCheckChange={onAllCheckChange}
      onSearchChange={onSearchChange}
      onClearClick={onClearClick}
    >
      <CosDropdown.Trigger
        className="h-[34px] w-[168px]"
        placeholder="Modify Statuses"
      >
        {selectedModified.length ? 'Modify Statuses' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {matchedStatuses.map((modified) => (
          <CosDropdown.Item
            key={modified.toString()}
            item={modified}
            onClick={() => onItemClick(modified)}
          >
            {modified ? 'Modified' : 'Unmodified'}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
