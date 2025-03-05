import { ReactNode, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { CosDropdownItem } from './CosDropdownItem'
import { CosDropdownMenu } from './CosDropdownMenu'
import { CosDropdownSkeleton } from './CosDropdownSkeleton'
import { CosDropdownTrigger } from './CosDropdownTrigger'
import { CosDropdownContext } from './context'
import { parseNodes } from './parseNodes'
import { dropdownLabel } from './styles'
import {
  CosDropdownType,
  CosDropdownVariant,
  OnAllCheckChange,
  OnClearClick,
  OnSearchChange,
  getOptionalProps,
} from './utils'

export type CosDropdownProps<Item, Type extends CosDropdownType> = {
  type?: Type
  variant?: CosDropdownVariant
  isPagination?: boolean
  label?: string
  selectedItems: Item[]
  disabled?: boolean
  isLoading?: boolean
  children: ReactNode
} & CheckboxDropdownProps<Type> &
  SearchDropdownProps<Type>

type CheckboxDropdownProps<Type extends CosDropdownType> = Type extends
  | 'checkbox'
  | 'search-checkbox'
  ? {
      onAllCheckChange: OnAllCheckChange
    }
  : unknown

type SearchDropdownProps<Type extends CosDropdownType> = Type extends
  | 'search'
  | 'search-checkbox'
  ? {
      searchValue: string
      onSearchChange: OnSearchChange
      onClearClick: OnClearClick
    }
  : unknown

export const CosDropdown = <Item, Type extends CosDropdownType>(
  props: CosDropdownProps<Item, Type>,
) => {
  const {
    type = 'regular',
    variant = 'default',
    isPagination = false,
    label,
    selectedItems,
    disabled = false,
    isLoading = false,
    children,
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const optionalProps = getOptionalProps(props)

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    placement: 'bottom-left',
    autoPlacement: true,
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

  const {
    triggerNode,
    menuNode,
    enabledItemCount: itemCount,
  } = parseNodes(children)

  const toggleDropdownOpen = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        setDropdownOpen(false)
      }
    },
    [anchorRef, elementRef],
  )

  const renderLabel = () => {
    if (!label) return null
    return <p className={twMerge(dropdownLabel({ variant }))}>{label}</p>
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  if (isLoading)
    return <CosDropdownSkeleton variant={variant} hasLabel={!!label} />

  return (
    <CosDropdownContext.Provider
      value={{
        // Internal control
        dropdownOpen,
        toggleDropdownOpen,
        floatingProps,
        // Common props
        type,
        variant,
        isPagination,
        selectedItems,
        itemCount,
        disabled,
        // Checkbox props
        onAllCheckChange: optionalProps.onAllCheckChange,
        onClearClick: optionalProps.onClearClick,
        // Search props
        searchValue: optionalProps.searchValue,
        onSearchChange: optionalProps.onSearchChange,
      }}
    >
      <div>
        {renderLabel()}
        {triggerNode}
        {menuNode}
      </div>
    </CosDropdownContext.Provider>
  )
}

CosDropdown.Trigger = CosDropdownTrigger
CosDropdown.Menu = CosDropdownMenu
CosDropdown.Item = CosDropdownItem

export default CosDropdown
