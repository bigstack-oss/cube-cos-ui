import { ReactNode, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { CosCheckbox, CosCheckboxColor } from '../CosCheckbox/CosCheckbox'
import { CosDropdownSearchBar } from './CosDropdownSearchBar'
import { CosDropdownContext } from './context'
import { content, item } from './styles'

export type CosDropdownMenuProps = {
  children: ReactNode
}

export const CosDropdownMenu = (props: CosDropdownMenuProps) => {
  const { children } = props

  const {
    floatingProps,
    variant,
    type,
    onAllCheckChange,
    selectedItems,
    itemCount,
    searchValue,
  } = useContext(CosDropdownContext)

  const { elementRef, resolvedStyles } = floatingProps

  const isCheckbox = type === 'checkbox' || type === 'search-checkbox'

  const showSearchInput = type === 'search' || type === 'search-checkbox'

  const showAllCheckbox =
    (type === 'checkbox' || type === 'search-checkbox') && !searchValue

  const isAllChecked = useMemo(() => {
    return selectedItems.length === itemCount
  }, [selectedItems.length, itemCount])

  const getCheckboxColor = (): CosCheckboxColor | undefined => {
    if (type === 'checkbox') return 'primary-dark'
    if (type === 'search-checkbox') return 'secondary-dark'
    return undefined
  }

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(content({ variant }))}
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
            disabled={false}
            checked={isAllChecked}
            onClick={() => onAllCheckChange?.(!isAllChecked)}
            color={getCheckboxColor()}
          />
        </div>
      )}
      {children}
    </div>,
    document.body,
  )
}
