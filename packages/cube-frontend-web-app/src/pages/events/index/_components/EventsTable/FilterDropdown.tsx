import { ChangeEvent, useState } from 'react'
import { upperFirst } from 'lodash'
import { CosDropdown } from '@cube-frontend/ui-library'
import { FilterOptions } from './useEventsQuery'

type FilterDropdownProps<Key extends keyof FilterOptions> = {
  isLoading: boolean
  filterKey: Key
  options: FilterOptions[Key][]
  selectedValue: FilterOptions[Key] | undefined
  onChange: (key: Key, value: FilterOptions[Key] | undefined) => void
}

const filterOptionBySearchValue = <Key extends keyof FilterOptions>(
  searchValue: string,
  options: FilterOptions[Key][],
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
  const { isLoading, filterKey, options, selectedValue, onChange } = props

  const selectedItem = selectedValue ? [selectedValue] : []

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClearClick = () => {
    onChange(filterKey, undefined)
  }

  const renderOptions = () => {
    const filteredOptions = filterOptionBySearchValue(searchValue, options)

    return filteredOptions.map((option) => (
      <CosDropdown.Item
        key={option}
        item={option}
        onClick={() => onChange(filterKey, option)}
      >
        {option}
      </CosDropdown.Item>
    ))
  }

  return (
    <CosDropdown
      type="search"
      variant="in-table"
      selectedItems={selectedItem}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClearClick={handleClearClick}
      disabled={false}
      isLoading={isLoading}
    >
      <CosDropdown.Trigger placeholder={upperFirst(filterKey)}>
        {selectedItem?.[0] ?? undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>{renderOptions()}</CosDropdown.Menu>
    </CosDropdown>
  )
}
