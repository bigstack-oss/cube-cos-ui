import { ButtonHTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import ChevronDown from '../../components/CosIcon/monochrome/chevron_down.svg?react'
import XSmall from '../../components/CosIcon/monochrome/x_small.svg?react'
import { CosDropdownContext } from './context'
import { clearButton, trigger, triggerIcon } from './styles'

export type CosDropdownTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  children?: string
  placeholder?: string
}

export const CosDropdownTrigger = (props: CosDropdownTriggerProps) => {
  const { children, placeholder } = props

  const {
    dropdownOpen: isOpen,
    toggleDropdownOpen,
    floatingProps,
    type,
    variant,
    isPagination,
    selectedItems,
    disabled,
    onClearClick,
  } = useContext(CosDropdownContext)

  const isSelected = selectedItems.length > 0

  const hasSearchbar = type === 'search' || type === 'search-checkbox'

  const placeholderText = placeholder ?? 'Choose'

  const displayText = isSelected ? children : placeholderText

  const renderSelectedItemCount = () => {
    return type === 'search-checkbox' && isSelected ? (
      <p>{`(${selectedItems.length})`}</p>
    ) : null
  }

  const renderClearButton = () => {
    const handleClearClick = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()
      onClearClick?.()
    }

    return (type === 'search' || type === 'search-checkbox') && isSelected ? (
      <XSmall
        className={twMerge(clearButton({ disabled }))}
        onClick={(e) => handleClearClick(e)}
      />
    ) : null
  }

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleDropdownOpen}
      className={twMerge(
        trigger({
          variant,
          hasSearchbar,
          hasSelectedValue: isSelected,
          disabled,
          isPagination,
        }),
      )}
    >
      <span className="w-full truncate text-left">{displayText}</span>
      <span className="flex shrink-0 items-center gap-2">
        {renderSelectedItemCount()}
        {renderClearButton()}
        <ChevronDown className={twMerge(triggerIcon({ isOpen }))} />
      </span>
    </button>
  )
}
