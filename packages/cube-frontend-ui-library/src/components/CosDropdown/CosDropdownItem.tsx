import { useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'
import { CosDropdownContext } from './context'
import { item } from './styles'

export type CosDropdownItemProps = {
  children: string
  disabled?: boolean
  checked: boolean
  onClick: () => void
}

export const CosDropdownItem = (props: CosDropdownItemProps) => {
  const { children: label, disabled = false, checked, onClick } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const { variant, type } = useContext(CosDropdownContext)

  const isCheckbox = type === 'checkbox' || type === 'search-checkbox'

  const handleClick = () => !disabled && onClick()

  return isCheckbox ? (
    <div
      ref={containerRef}
      className={twMerge(
        item({ variant, isSelected: checked, isCheckbox, disabled }),
      )}
    >
      {/** TODO: The checkbox needs to be aligned with the design */}
      <CosCheckbox
        label={label}
        disabled={disabled}
        checked={checked}
        onChange={handleClick}
      />
    </div>
  ) : (
    <div
      ref={containerRef}
      className={twMerge(
        item({ variant, isSelected: checked, isCheckbox, disabled }),
      )}
      onClick={handleClick}
    >
      <input
        type="radio"
        className="peer hidden"
        disabled={disabled}
        checked={checked}
        onChange={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      />
      <span>{label}</span>
    </div>
  )
}
