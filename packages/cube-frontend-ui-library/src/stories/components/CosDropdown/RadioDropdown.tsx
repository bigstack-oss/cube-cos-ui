import { useState } from 'react'
import { CosDropdown } from '../../../components/CosDropdown/CosDropdown'
import {
  CosDropdownSize,
  CosDropdownVariant,
} from '../../../components/CosDropdown/cosDropdownTypes'
import { MockDataItem, mockData } from './mockData'

type RadioDropdownProps = {
  size: CosDropdownSize
  variant: CosDropdownVariant
  isLoading: boolean
  selected: boolean
  disabled: boolean
  label?: string
}

export const RadioDropdown = (props: RadioDropdownProps) => {
  const { size, variant, isLoading, selected, disabled, label } = props

  const [selectedItems, setSelectedItems] = useState<MockDataItem[]>(() =>
    selected ? [mockData[0]] : [],
  )

  const onItemClick = (item: MockDataItem) => {
    if (disabled) return
    if (selectedItems.includes(item)) {
      setSelectedItems([])
    } else {
      setSelectedItems([item])
    }
  }

  return (
    <CosDropdown
      size={size}
      type="radio"
      variant={variant}
      selectedItems={selectedItems}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
    >
      <CosDropdown.Trigger placeholder="Select an Item">
        {selectedItems.length > 0 ? selectedItems[0].label : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {mockData.map((item) => (
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
