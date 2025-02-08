import { ButtonHTMLAttributes, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CaretDown from '../../components/CosIcon/monochrome/caret_down.svg?react'
import XSmall from '../../components/CosIcon/monochrome/x_small.svg?react'
import { CosDropdownContext } from './context'
import { trigger, triggerIcon, dropdownLabel } from './styles'

export type CosDropdownTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: string
    placeholder?: string
  }

export const CosDropdownTrigger = (props: CosDropdownTriggerProps) => {
  const { children, placeholder, disabled: isDisabledProps } = props

  const [isSelected, setIsSelected] = useState(false)

  const {
    dropdownOpen: isOpen,
    onDropdownOpenChange,
    type,
    variant,
    label,
    selectedItems,
    disabled: isDisabledContext,
    onClearClick,
  } = useContext(CosDropdownContext)

  const hasSearchbar = type === 'search' || type === 'search-checkbox'

  const disabled = isDisabledProps || isDisabledContext

  const placeholderText = placeholder ?? 'Choose'

  const displayText = isSelected ? children : placeholderText

  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [isSelected, selectedItems])

  const renderLabel = () => {
    if (!label) return null
    return <p className={twMerge(dropdownLabel({ variant }))}>{label}</p>
  }

  const renderClearButton = () => {
    const handleClearClick = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()
      onClearClick?.()
    }

    return (type === 'search' || type === 'search-checkbox') && isSelected ? (
      <XSmall className="icon-md" onClick={(e) => handleClearClick(e)} />
    ) : null
  }

  return (
    <>
      {renderLabel()}
      <button
        type="button"
        disabled={disabled}
        onClick={onDropdownOpenChange}
        className={twMerge(
          trigger({
            variant,
            hasSearchbar,
            hasSelectedValue: isSelected,
            disabled,
          }),
        )}
      >
        <span className="w-full truncate text-left">{displayText}</span>
        <span className="flex shrink-0 items-center">
          {renderClearButton()}
          <CaretDown className={twMerge(triggerIcon({ isOpen }))} />
        </span>
      </button>
    </>
  )
}
