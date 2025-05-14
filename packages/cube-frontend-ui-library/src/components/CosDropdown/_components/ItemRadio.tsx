import { twMerge } from 'tailwind-merge'
import { CosDropdownSize, CosDropdownVariant } from '../cosDropdownTypes'
import { item } from '../cosDropdownStyles'

type ItemRadioProps = {
  size: CosDropdownSize
  variant: CosDropdownVariant
  label: string
  onClick: () => void
  isSelected: boolean
  disabled: boolean
}

export const ItemRadio = (props: ItemRadioProps) => {
  const { size, variant, label, onClick, isSelected, disabled } = props
  return (
    <div
      className={twMerge(item.radio({ size, variant, isSelected, disabled }))}
      onClick={onClick}
    >
      {label}
    </div>
  )
}
