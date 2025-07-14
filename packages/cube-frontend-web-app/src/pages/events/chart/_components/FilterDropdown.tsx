import { useEffect, useState } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { FilterOptions } from './useEventsChartQuery'

type FilterDropdownProps<Key extends keyof FilterOptions> = {
  isLoading: boolean
  filterKey: Key
  filterLabel: string
  options: FilterOptions[Key]
  selectedValue: FilterOptions[Key] | undefined
  onFieldChange: (key: Key, value: string) => void
  onFieldAllSelect: (key: Key, options: FilterOptions[Key]) => void
}

export const FilterDropdown = <Key extends keyof FilterOptions>(
  props: FilterDropdownProps<Key>,
) => {
  const {
    isLoading,
    filterKey,
    filterLabel,
    options,
    selectedValue,
    onFieldChange,
    onFieldAllSelect,
  } = props

  const [selectedItems, setSelectedItems] = useState<FilterOptions[Key]>(
    selectedValue || ([] as string[]),
  )

  useEffect(() => {
    if (selectedValue) setSelectedItems(selectedValue)
  }, [selectedValue])

  const handleItemClick = (selectedItem: string) => {
    onFieldChange(filterKey, selectedItem)
  }

  const handleAllClick = () => {
    onFieldAllSelect(filterKey, options)
  }

  const renderOptions = () => {
    return options.map((option) => {
      return (
        <CosDropdown.Item
          key={option}
          item={option}
          onClick={() => handleItemClick(option)}
        >
          {option}
        </CosDropdown.Item>
      )
    })
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      selectedItems={selectedItems}
      onAllCheckChange={handleAllClick}
      disabled={false}
      isLoading={isLoading}
    >
      <CosDropdown.Trigger placeholder={filterLabel}>
        {selectedValue?.length ? filterLabel : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>{renderOptions()}</CosDropdown.Menu>
    </CosDropdown>
  )
}
