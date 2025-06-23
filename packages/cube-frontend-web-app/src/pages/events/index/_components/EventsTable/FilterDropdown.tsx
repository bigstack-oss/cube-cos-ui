import { ChangeEvent, useState } from 'react'
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

const filterOptionBySearchValue = <Key extends keyof FilterOptions>(
  searchValue: string,
  options: FilterOptions[Key],
): string[] => {
  if (searchValue === '') return options

  const lowerSearchValue = searchValue.toLowerCase()

  return options.filter((option) => {
    return option.toLowerCase().includes(lowerSearchValue)
  })
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

  const [searchValue, setSearchValue] = useState('')

  const filterLabel = upperFirst(filterKey)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleAllCheckChange = () => {
    const allChecked = selectedValue.length === options.length
    if (allChecked) {
      onFieldAllCheckChange(filterKey, [])
    } else {
      onFieldAllCheckChange(filterKey, options)
    }
  }

  const handleClearClick = () => {
    onFieldClear(filterKey)
  }

  const renderOptions = () => {
    const filteredOptions = filterOptionBySearchValue(searchValue, options)

    return filteredOptions.map((option) => (
      <CosDropdown.Item
        key={option}
        item={option}
        onClick={() => onFieldChange(filterKey, option)}
      >
        {option}
      </CosDropdown.Item>
    ))
  }

  return (
    <CosDropdown
      type="search-checkbox"
      variant="in-table"
      isLoading={isLoading}
      selectedItems={selectedValue}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClearClick={handleClearClick}
      onAllCheckChange={handleAllCheckChange}
    >
      <CosDropdown.Trigger placeholder={filterLabel}>
        {filterLabel}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>{renderOptions()}</CosDropdown.Menu>
    </CosDropdown>
  )
}
