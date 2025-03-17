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

  const selectedItem = selectedValue ? [selectedValue] : []

  const renderOptions = () => {
    return options.map((option) => {
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
