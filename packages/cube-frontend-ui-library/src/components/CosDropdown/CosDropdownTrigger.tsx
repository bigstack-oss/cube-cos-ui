import { ButtonHTMLAttributes, useContext } from 'react'
import CaretDown from '../../components/CosIcon/monochrome/caret_down.svg?react'
import CaretUp from '../../components/CosIcon/monochrome/caret_up.svg?react'
import { SvgElement } from '../CosIcon/CosIcon'
import { CosDropdownContext } from './cosDropdownUtils'
import { twMerge } from 'tailwind-merge'
import { trigger } from './cosDropdownStyles'

export type CosDropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

const triggerIconBaseClass = twMerge('icon-md shrink-0')
const triggerIcons: Record<'open' | 'close', SvgElement> = {
  open: <CaretDown className={twMerge(triggerIconBaseClass)} />,
  close: <CaretUp className={twMerge(triggerIconBaseClass)} />,
}

export const CosDropdownTrigger = (props: CosDropdownTriggerProps) => {
  const { ...restProps } = props
  const {
    label,
    placeholder,
    disabled,
    variant,
    type,
    isOpen,
    onOpenChange,
    selectedItems,
  } = useContext(CosDropdownContext)

  const placeholderText = placeholder ?? 'Choose'

  const isSelected = selectedItems && selectedItems.length > 0

  const displayText = !isSelected
    ? placeholderText
    : type === 'radio'
      ? selectedItems[0].label
      : `${selectedItems.length} selected`

  const renderLabel = () => {
    if (!label || variant === 'in-table') return null
    return (
      <div className="primary-body3 font-semibold text-functional-title">
        Label
      </div>
    )
  }

  const handleClick = (prev: boolean) => {
    onOpenChange(!prev)
  }

  return (
    <>
      {renderLabel()}
      <button
        {...restProps}
        type="button"
        disabled={disabled}
        onClick={() => handleClick(isOpen)}
        className={twMerge(trigger({ variant, disabled, isSelected }))}
      >
        {displayText}
        <span className="">
          {isOpen ? triggerIcons.open : triggerIcons.close}
        </span>
      </button>
    </>
  )
}
