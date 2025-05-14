import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { CosDropdownTrigger } from './CosDropdownTrigger'
import { CosDropdownMenu } from './CosDropdownMenu'
import { CosDropdownItem } from './CosDropdownItem'
import { CosDropdownSkeleton } from './CosDropdownSkeleton'
import { CosDropdownProps } from './cosDropdownTypes'
import { CosDropdownContext } from './cosDropdownContext'
import { getOptionalProps } from './cosDropdownUtils'
import { parseNodes } from './parseNodes'
import { label as labelStyle } from './cosDropdownStyles'

export const CosDropdown = <Item,>(props: CosDropdownProps<Item>) => {
  const {
    size = 'md',
    type,
    variant = 'regular',
    selectedItems,
    isLoading = false,
    disabled = false,
    label,
    skeletonClassName,
    children,
  } = props

  const optionalProps = getOptionalProps(props)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [searchValue, setSearchValue] = useState<string>('')

  const toggleDropdownOpen = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    isOpen: dropdownOpen,
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

  const { triggerNode, menuNode, enabledItemCount } = parseNodes(children)

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderLabel = () => {
    if (!label) return null
    return <p className={twMerge(labelStyle({ size }))}>{label}</p>
  }

  if (isLoading) {
    return (
      <CosDropdownSkeleton
        className={skeletonClassName}
        size={size}
        hasLabel={!!label}
      />
    )
  }

  return (
    <CosDropdownContext.Provider
      value={{
        floatingProps,
        dropdownOpen,
        toggleDropdownOpen,
        size,
        type,
        variant,
        disabled,
        selectedItems,
        enabledItemCount,

        onAllCheckChange: optionalProps.onAllCheckChange,
        onClearSelection: optionalProps.onClearSelection,

        searchValue,
        handleSearchValueChange,
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
