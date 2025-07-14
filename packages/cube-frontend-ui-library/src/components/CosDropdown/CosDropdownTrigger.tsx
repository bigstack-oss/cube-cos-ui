import { ButtonHTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import ChevronDown from '../../components/CosIcon/monochrome/chevron_down.svg?react'
import XSmall from '../../components/CosIcon/monochrome/x_small.svg?react'
import { CosDropdownContext } from './cosDropdownContext'
import { trigger } from './cosDropdownStyles'

export type CosDropdownTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  children?: string
  placeholder?: string
}

export const CosDropdownTrigger = (props: CosDropdownTriggerProps) => {
  const { children, placeholder, className } = props

  const {
    dropdownOpen,
    toggleDropdownOpen,
    floatingProps,
    size,
    type,
    variant,
    selectedItems,
    disabled,
    onClearSelection,
  } = useContext(CosDropdownContext)

  const isSelected = selectedItems.length > 0

  const placeholderText = placeholder ?? 'Choose'

  const displayText = isSelected ? children : placeholderText

  const renderSelectedItemCount = () => {
    if (type === 'radio' || !isSelected) return null
    return (
      <p className={trigger.count({ variant, disabled })}>
        {`(${selectedItems.length})`}
      </p>
    )
  }

  const renderClearButton = () => {
    const handleClearClick = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()
      onClearSelection?.()
    }

    if (type === 'checkbox' && variant === 'withFilter' && isSelected)
      return (
        <XSmall
          className={twMerge(trigger.clearButton({ disabled }))}
          onClick={(e) => handleClearClick(e)}
        />
      )

    return null
  }

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleDropdownOpen}
      className={twMerge(
        trigger.container({
          size,
          variant,
          dropdownOpen,
          isSelected,
          disabled,
        }),
        className,
      )}
    >
      <span className="w-full truncate text-left">{displayText}</span>
      <span className="flex shrink-0 items-center gap-2">
        {renderSelectedItemCount()}
        {renderClearButton()}
        <ChevronDown
          className={twMerge(trigger.icon({ dropdownOpen, disabled }))}
        />
      </span>
    </button>
  )
}
