import { ReactNode, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosDropdownContext } from './context'
import { CosDropdownSearchBar } from './CosDropdownSearchBar'
import { CosDropdownItem } from './CosDropdownItem'
import { content } from './styles'

export type CosDropdownMenuProps = {
  children: ReactNode
}

export const CosDropdownMenu = (props: CosDropdownMenuProps) => {
  const { children } = props

  const {
    dropdownOpen: isVisible,
    variant,
    type,
    onAllCheckChange,
    selectedItems,
    itemCount,
  } = useContext(CosDropdownContext)

  const [isAllChecked, setIsAllChecked] = useState(
    selectedItems.length === itemCount,
  )

  // TODO: Implement vertical placement with useFloating hook
  const verticalPlacement = 'bottom'

  const showSearchInput = type === 'search' || type === 'search-checkbox'

  const showAllCheckbox = type === 'checkbox' || type === 'search-checkbox'

  useEffect(() => {
    setIsAllChecked(selectedItems.length === itemCount)
  }, [selectedItems, itemCount])

  return (
    <div
      className={twMerge(content({ isVisible, variant, verticalPlacement }))}
    >
      {showSearchInput && <CosDropdownSearchBar />}
      {showAllCheckbox && (
        <CosDropdownItem
          checked={isAllChecked}
          onClick={() => onAllCheckChange?.(!isAllChecked)}
        >
          All
        </CosDropdownItem>
      )}
      {children}
    </div>
  )
}
