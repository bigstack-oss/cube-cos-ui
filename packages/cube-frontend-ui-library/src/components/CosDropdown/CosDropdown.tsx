import { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { CosDropdownTrigger } from './CosDropdownTrigger'
import { CosDropdownContent } from './CosDropdownContent'
import { CosDropdownFilter } from './CosDropdownFilter'
import { CosDropdownItem } from './CosDropdownItem'
import {
  defaultValue,
  CosDropdownContext,
  CosDropdownType,
  CosDropdownItemType,
  CosDropdownVariant,
} from './cosDropdownUtils'

export type CosDropdownProps = PropsWithChildren<{
  label?: string
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  variant?: CosDropdownVariant
  type?: CosDropdownType
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  selectedItems?: CosDropdownItemType[]
  onSelectedItemsChange?: (value: CosDropdownItemType) => void
}>

export const CosDropdown = (props: CosDropdownProps) => {
  const {
    label,
    placeholder = defaultValue.placeholder,
    disabled = defaultValue.disabled,
    isLoading = defaultValue.isLoading,
    variant = defaultValue.variant,
    type = defaultValue.type,
    isOpen: isOpenProp,
    onOpenChange: onOpenChangeProp,
    selectedItems: selectedItemsProps,
    onSelectedItemsChange: onSelectedItemsChangeProps,
    children,
  } = props

  const [isOpenState, setIsOpenState] = useState(isOpenProp ?? false)
  const [selectedItemsState, setSelectedItemsState] = useState<
    CosDropdownItemType[]
  >([])
  const [filterValue, setFilterValue] = useState<string>()

  const containerRef = useRef<HTMLDivElement>(null)
  const isOpen = isOpenProp ? isOpenProp : isOpenState

  const selectedItems = selectedItemsProps ?? selectedItemsState

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      setIsOpenState(isOpen)
      onOpenChangeProp?.(isOpen)
    },
    [onOpenChangeProp],
  )

  const handleSelectedItemChange = (selectedItem: CosDropdownItemType) => {
    if (type === 'radio') {
      setSelectedItemsState([selectedItem])
    } else {
      setSelectedItemsState((prevItems) => {
        const isSelected = prevItems.some(
          (item) => item.key === selectedItem.key,
        )
        return isSelected
          ? prevItems.filter((item) => item.key !== selectedItem.key)
          : [...prevItems, selectedItem]
      })
    }
    onSelectedItemsChangeProps?.(selectedItem)
  }

  return (
    <CosDropdownContext.Provider
      value={{
        label,
        placeholder,
        disabled,
        isLoading,
        variant,
        type,
        isOpen,
        onOpenChange,
        selectedItems,
        onSelectedItemsChange: handleSelectedItemChange,
        filterValue,
        setFilterValue,
      }}
    >
      <div ref={containerRef} className="relative w-full space-y-2">
        {children}
      </div>
    </CosDropdownContext.Provider>
  )
}

CosDropdown.Trigger = CosDropdownTrigger
CosDropdown.Content = CosDropdownContent
CosDropdown.Filter = CosDropdownFilter
CosDropdown.Item = CosDropdownItem

export default CosDropdown
