import { ReactNode, useContext, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'
import { CosDropdownSearchBar } from './CosDropdownSearchBar'
import { CosDropdownContext } from './context'
import { content, item } from './styles'

export type CosDropdownMenuProps = {
  children: ReactNode
}

export const CosDropdownMenu = (props: CosDropdownMenuProps) => {
  const { children } = props

  const {
    dropdownOpen: isVisible,
    floatingProps,
    variant,
    type,
    onAllCheckChange,
    selectedItems,
    itemCount,
    searchValue,
  } = useContext(CosDropdownContext)

  const { elementRef, resolvedStyles } = floatingProps

  // TODO: Implement vertical placement with useFloating hook
  const verticalPlacement = 'bottom'

  const isCheckbox = type === 'checkbox' || type === 'search-checkbox'

  const showSearchInput = type === 'search' || type === 'search-checkbox'

  const showAllCheckbox =
    (type === 'checkbox' || type === 'search-checkbox') &&
    (!searchValue || searchValue == '')

  const isAllChecked = useMemo(() => {
    return selectedItems.length === itemCount
  }, [selectedItems.length, itemCount])

  return (
    <div
      ref={elementRef}
      className={twMerge(content({ isVisible, variant, verticalPlacement }))}
      style={resolvedStyles?.floatingStyle}
    >
      {showSearchInput && <CosDropdownSearchBar />}
      {showAllCheckbox && (
        <div
          className={twMerge(
            item({
              variant,
              type,
              isSelected: isAllChecked,
              isCheckbox,
              disabled: false,
            }),
          )}
        >
          <CosCheckbox
            label="All"
            checked={isAllChecked}
            onClick={() => onAllCheckChange?.(!isAllChecked)}
          />
        </div>
      )}
      {children}
    </div>
  )
}
