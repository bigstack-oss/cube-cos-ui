import { upperFirst } from 'lodash'
import { CosDropdown } from '@cube-frontend/ui-library'
import { FilterOptions } from './useEventsQuery'

type FilterDropdownProps<Key extends keyof FilterOptions> = {
  isLoading: boolean
  filterKey: Key
  options: FilterOptions[Key]
  selectedValue: string[]
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: string,
  ) => void
  onFieldAllCheckChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key],
  ) => void
  onFieldClear: <Key extends keyof FilterOptions>(key: Key) => void
}

export const FilterDropdown = <Key extends keyof FilterOptions>(
  props: FilterDropdownProps<Key>,
) => {
  const {
    isLoading,
    filterKey,
    options,
    selectedValue,
    onFieldChange,
    onFieldAllCheckChange,
    onFieldClear,
  } = props

  const filterLabel = upperFirst(filterKey)

  const onAllCheckChange = (checked: boolean) => {
    if (checked) {
      onFieldAllCheckChange(filterKey, options)
    } else {
      onFieldAllCheckChange(filterKey, [])
    }
  }

  const onClearSelection = () => {
    onFieldClear(filterKey)
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      isLoading={isLoading}
      selectedItems={selectedValue}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger placeholder={filterLabel}>
        {filterLabel}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {options.map((option) => (
          <CosDropdown.Item
            key={option}
            item={option}
            onClick={() => onFieldChange(filterKey, option)}
          >
            {option}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
