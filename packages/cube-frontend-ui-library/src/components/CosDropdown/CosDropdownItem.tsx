import { LabelHTMLAttributes, useContext, useId } from 'react'
import { CosDropdownContext } from './cosDropdownUtils'
import { twMerge } from 'tailwind-merge'
import { item } from './cosDropdownStyles'

export type CosDropdownItemProps = LabelHTMLAttributes<HTMLLabelElement> & {
  value: string
  children: string
  disabled?: boolean
}

export const CosDropdownItem = (props: CosDropdownItemProps) => {
  const { variant, type, selectedItems, onSelectedItemsChange, filterValue } =
    useContext(CosDropdownContext)
  const { children, value, disabled = false, ...restProps } = props

  const isSelected = selectedItems.some(
    (selectedItem) => selectedItem.key === value,
  )

  // TODO: implement dropdown filter result
  const isFilterResult = children.includes(filterValue?.trim() ?? children)

  const defaultId = useId()

  const itemId = restProps.id ?? defaultId

  const handleSelect = () =>
    onSelectedItemsChange({ key: value, label: children, disabled })

  if (!isFilterResult) return null

  return (
    <label
      htmlFor={itemId}
      key={itemId}
      className={twMerge(item.label({ variant, isSelected }))}
    >
      <input
        type={type}
        id={itemId}
        className="peer hidden"
        checked={isSelected}
        disabled={disabled}
        onChange={handleSelect}
      />
      <span
        className={twMerge(item.span({ type, variant, isSelected, disabled }))}
      >
        {children}
      </span>
    </label>
  )
}
