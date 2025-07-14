import { useContext } from 'react'
import { ItemCheckbox } from './_components/ItemCheckbox'
import { ItemRadio } from './_components/ItemRadio'
import { CosDropdownContext } from './cosDropdownContext'

export type CosDropdownItemProps<Item> = {
  children: string
  item: Item
  /**
   * @default false
   */
  disabled?: boolean
  onClick: () => void
}

export const CosDropdownItem = <Item,>(props: CosDropdownItemProps<Item>) => {
  const {
    children: label,
    item,
    disabled = false,
    onClick: onClickProp,
  } = props

  const {
    size,
    type,
    variant,
    selectedItems,
    searchValue,
    toggleDropdownOpen,
  } = useContext(CosDropdownContext)

  const isSelected = selectedItems.includes(item)

  const shouldDisplay = (): boolean => {
    // Items in non-filter dropdowns should always be visible.
    if (variant !== 'withFilter') return true

    // If there isn't a search value, then show all the items.
    if (!searchValue) return true

    // If the item's label includes the search value (case-insensitive),
    // then it should be visible; otherwise, it should be hidden.
    return label.toLowerCase().includes(searchValue.toLowerCase())
  }

  const onClick = () => {
    if (disabled) return

    onClickProp()
    if (type === 'radio') toggleDropdownOpen()
  }

  if (!shouldDisplay()) {
    return null
  }

  if (type === 'checkbox')
    return (
      <ItemCheckbox
        size={size}
        variant={variant}
        label={label}
        isSelected={isSelected}
        disabled={disabled}
        onClick={onClick}
      />
    )

  return (
    <ItemRadio
      size={size}
      variant={variant}
      label={label}
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
