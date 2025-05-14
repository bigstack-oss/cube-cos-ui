import { twMerge } from 'tailwind-merge'
import { CosCheckbox, CosCheckboxColor } from '../../CosCheckbox/CosCheckbox'
import { CosDropdownSize, CosDropdownVariant } from '../cosDropdownTypes'
import { item } from '../cosDropdownStyles'

type ItemCheckboxProps = {
  /**
   * @default false
   */
  isDark?: boolean
  size: CosDropdownSize
  variant: CosDropdownVariant
  label: string
  onClick: () => void
  isSelected: boolean
  disabled: boolean
}

export const ItemCheckbox = (props: ItemCheckboxProps) => {
  const {
    isDark = false,
    size,
    variant,
    label,
    onClick,
    isSelected,
    disabled,
  } = props

  const getColor = (): CosCheckboxColor => {
    if (variant === 'regular') {
      return isDark ? 'primary-dark' : 'primary'
    } else {
      return isDark ? 'secondary-dark' : 'secondary'
    }
  }

  return (
    <div
      className={twMerge(
        item.checkbox({ size, variant, isSelected, disabled }),
      )}
    >
      <CosCheckbox
        label={label}
        labelClassName="truncate"
        disabled={disabled}
        checked={isSelected}
        onChange={onClick}
        color={getColor()}
      />
    </div>
  )
}
