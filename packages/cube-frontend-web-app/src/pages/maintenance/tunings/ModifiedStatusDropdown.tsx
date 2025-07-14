import { CosDropdown } from '@cube-frontend/ui-library'
import { modifiedOptions } from './tuningsUtils'

type ModifiedStatusDropdownProps = {
  selectedModified: boolean[]
  onItemClick: (modified: boolean) => void
  onAllCheckChange: (checked: boolean) => void
}

export const ModifiedStatusDropdown = (props: ModifiedStatusDropdownProps) => {
  const { selectedModified, onItemClick, onAllCheckChange } = props

  const onClearSelection = (): void => {
    onAllCheckChange(false)
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedModified}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger className="w-[168px]" placeholder="Modify Statuses">
        {selectedModified.length ? 'Modify Statuses' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {modifiedOptions.map((modified) => (
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
