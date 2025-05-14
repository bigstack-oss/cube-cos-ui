import { useCallback, useContext } from 'react'
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

  const shouldDisplay = searchValue
    ? label.toLowerCase().includes(searchValue.toLowerCase())
    : true

  const onClick = useCallback(() => {
    if (disabled) return

    onClickProp()
    if (type === 'radio') toggleDropdownOpen()
  }, [disabled, onClickProp, toggleDropdownOpen, type])

  if (variant === 'withFilter' && !shouldDisplay) {
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
