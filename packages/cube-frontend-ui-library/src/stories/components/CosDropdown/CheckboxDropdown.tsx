import { useState } from 'react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import {
  CosDropdownSize,
  CosDropdownVariant,
} from '../../../components/CosDropdown/cosDropdownTypes'
import { mockData, MockDataItem } from './mockData'

type CheckboxDropdownProps = {
  size: CosDropdownSize
  variant: CosDropdownVariant
  isLoading: boolean
  selected: boolean
  disabled: boolean
  isNoData: boolean
  label?: string
}

export const CheckboxDropdown = (props: CheckboxDropdownProps) => {
  const { size, variant, isLoading, selected, disabled, isNoData, label } =
    props

  const [selectedItems, setSelectedItems] = useState<MockDataItem[]>(() =>
    selected ? [mockData[0]] : [],
  )

  const onItemClick = (item: MockDataItem) => {
    if (disabled) return
    if (selectedItems.includes(item)) {
      setSelectedItems((prev) => prev.filter((i) => i !== item))
    } else {
      setSelectedItems((prev) => [...prev, item])
    }
  }

  const onAllCheckChange = (checked: boolean) => {
    if (disabled) return
    const enabledItems = mockData.filter((item) => !item.disabled)
    if (checked) {
      setSelectedItems(enabledItems)
    } else {
      setSelectedItems([])
    }
  }

  const onClearSelection = () => {
    onAllCheckChange(false)
  }

  if (variant === 'regular')
    return (
      <CosDropdown
        size={size}
        type="checkbox"
        variant="regular"
        selectedItems={selectedItems}
        isLoading={isLoading}
        disabled={disabled}
        label={label}
        onAllCheckChange={onAllCheckChange}
      >
        <CosDropdown.Trigger placeholder="Select an Item">
          {selectedItems.length > 0
            ? selectedItems.map((item) => item.label).join(', ')
            : undefined}
        </CosDropdown.Trigger>
        <CosDropdown.Menu>
          {isNoData
            ? null
            : mockData.map((item) => (
                <CosDropdown.Item
                  key={item.value}
                  item={item}
                  disabled={item.disabled}
                  onClick={() => onItemClick(item)}
                >
                  {item.label}
                </CosDropdown.Item>
              ))}
        </CosDropdown.Menu>
      </CosDropdown>
    )

  return (
    <CosDropdown
      size={size}
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedItems}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger placeholder="Select an Item">
        {selectedItems.length > 0
          ? selectedItems.map((item) => item.label).join(', ')
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {isNoData
          ? null
          : mockData.map((item) => (
              <CosDropdown.Item
                key={item.value}
                item={item}
                disabled={item.disabled}
                onClick={() => onItemClick(item)}
              >
                {item.label}
              </CosDropdown.Item>
            ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
