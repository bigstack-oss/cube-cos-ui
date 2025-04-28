import { useEffect, useState } from 'react'
import { upperFirst } from 'lodash'
import { CosDropdown } from '@cube-frontend/ui-library'
import { FilterOptions } from './useEventsChartQuery'

type FilterDropdownProps<Key extends keyof FilterOptions> = {
  isLoading: boolean
  filterKey: Key
  filterLabel: string
  options: FilterOptions[Key][]
  selectedValue: FilterOptions[Key] | undefined
  onFieldChange: (key: Key, value: FilterOptions[Key] | undefined) => void
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
  } = props

  const [selectedItem, setSelectedItem] = useState<string[]>(
    selectedValue ? [selectedValue] : [],
  )

  useEffect(() => {
    if (selectedValue) {
      setSelectedItem([selectedValue])
    }
  }, [selectedValue])

  const modifiedOptions = ['All', ...options]

  const handleItemClick = (selectedItem: string) => {
    if (selectedItem === 'All') {
      onFieldChange(filterKey, undefined)
      setSelectedItem([selectedItem])
      return
    }

    onFieldChange(filterKey, selectedItem)
  }

  const renderOptions = () => {
    return modifiedOptions.map((option) => {
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
      variant="in-table"
      selectedItems={selectedItem}
      disabled={false}
      isLoading={isLoading}
    >
      <CosDropdown.Trigger placeholder={upperFirst(filterLabel)}>
        {selectedItem?.[0] ?? undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>{renderOptions()}</CosDropdown.Menu>
    </CosDropdown>
  )
}
