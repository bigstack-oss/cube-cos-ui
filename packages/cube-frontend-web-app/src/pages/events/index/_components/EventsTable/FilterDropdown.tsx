import { ChangeEvent, useState } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { toUpperCaseFirstLetter } from '@cube-frontend/utils'

type FilterDropdownProps = {
  isLoading: boolean
  filterKey: string
  options: string[]
  selectedValue: string | undefined
  onChange: (updates: Record<string, string | null>) => void
}

export const FilterDropdown = (props: FilterDropdownProps) => {
  const {
    isLoading,
    filterKey,
    options,
    selectedValue,
    onChange: onDropdownChange,
  } = props

  const selectedItem = selectedValue ? [selectedValue] : []

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClearClick = () => {
    onDropdownChange({ [filterKey]: null })
  }

  const renderOptions = () => {
    return options.map((option) => {
      if (
        searchValue &&
        !option.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return null
      }

      return (
        <CosDropdown.Item
          key={option}
          item={option}
          onClick={() => onDropdownChange({ [filterKey]: option })}
        >
          {option}
        </CosDropdown.Item>
      )
    })
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
      <CosDropdown.Trigger placeholder={toUpperCaseFirstLetter(filterKey)}>
        {selectedItem?.[0] ?? undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>{renderOptions()}</CosDropdown.Menu>
    </CosDropdown>
  )
}
