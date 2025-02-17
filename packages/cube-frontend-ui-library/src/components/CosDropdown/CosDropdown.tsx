import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
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
    label,
    selectedItems,
    disabled = false,
    isLoading = false,
    children,
  } = props

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const optionalProps = getOptionalProps(props)

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    placement: 'bottom-left',
    boundaryElement: document.body,
    autoPlacement: true,
    offsets: {
      y: 8,
    },
  })

  const {
    triggerNode,
    menuNode,
    enabledItemCount: itemCount,
  } = parseNodes(children)

  const onDropdownOpenChange = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setDropdownOpen(false)
    }
  }, [])

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
        onDropdownOpenChange,
        floatingProps,
        // Common props
        type,
        variant,
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
      <div ref={dropdownRef}>
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
