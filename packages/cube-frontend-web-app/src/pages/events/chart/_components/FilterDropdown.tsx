import { useEffect, useState } from 'react'
import { upperFirst } from 'lodash'
import { CosDropdown } from '@cube-frontend/ui-library'

type FilterDropdownProps = {
  isLoading: boolean
  filterKey: string
  filterLabel: string
  options: string[]
  selectedValue: string | undefined
  onChange: (updates: Record<string, string | null>) => void
}

export const FilterDropdown = (props: FilterDropdownProps) => {
  const {
    isLoading,
    filterKey,
    filterLabel,
    options,
    selectedValue,
    onChange: onDropdownChange,
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

  const handleItemClick = (option: string) => {
    if (option === 'All') {
      onDropdownChange({ [filterKey]: null })
      setSelectedItem([option])
      return
    }

    onDropdownChange({ [filterKey]: option })
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
