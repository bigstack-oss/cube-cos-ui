import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosCheckbox, CosCheckboxColor } from '../CosCheckbox/CosCheckbox'
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

  const { variant, type, selectedItems, toggleDropdownOpen } =
    useContext(CosDropdownContext)

  const isCheckbox = type === 'checkbox' || type === 'search-checkbox'

  const isSelected = selectedItems.includes(item)

  const handleClick = () => {
    if (disabled) return

    onClick()
    if (type === 'regular' || type === 'search') {
      toggleDropdownOpen()
    }
  }

  const getCheckboxColor = (): CosCheckboxColor | undefined => {
    if (type === 'checkbox') return 'primary'
    if (type === 'search-checkbox') return 'secondary'
    return undefined
  }

  if (isCheckbox)
    return (
      <div
        className={twMerge(
          itemStyle({ variant, type, isSelected, isCheckbox, disabled }),
        )}
      >
        <CosCheckbox
          label={label}
          labelClassName="truncate"
          disabled={disabled}
          checked={isSelected}
          onChange={handleClick}
          color={getCheckboxColor()}
        />
      </div>
    )

  return (
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
