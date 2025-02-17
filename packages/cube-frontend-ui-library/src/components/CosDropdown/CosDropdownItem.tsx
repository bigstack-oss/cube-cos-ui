import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'
import { CosDropdownContext } from './context'
import { item as itemStyle } from './styles'

export type CosDropdownItemProps<Item> = {
  children: string
  disabled?: boolean
  item: Item
  onClick: () => void
}

export const CosDropdownItem = <Item,>(props: CosDropdownItemProps<Item>) => {
  const { children: label, disabled = false, item, onClick } = props

  const { variant, type, selectedItems, onDropdownOpenChange } =
    useContext(CosDropdownContext)

  const isCheckbox = type === 'checkbox' || type === 'search-checkbox'

  const isSelected = selectedItems.includes(item)

  const handleClick = () => {
    if (disabled) return

    onClick()
    if (type === 'regular' || type === 'search') {
      onDropdownOpenChange()
    }
  }

  return isCheckbox ? (
    <div
      className={twMerge(
        itemStyle({ variant, type, isSelected, isCheckbox, disabled }),
      )}
    >
      {/** TODO: The checkbox needs to be aligned with the design */}
      <CosCheckbox
        label={label}
        disabled={disabled}
        checked={isSelected}
        onChange={handleClick}
      />
    </div>
  ) : (
    <div
      className={twMerge(
        itemStyle({ variant, type, isSelected, isCheckbox, disabled }),
      )}
      onClick={handleClick}
    >
      {label}
    </div>
  )
}
