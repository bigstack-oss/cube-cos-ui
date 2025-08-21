import { Children, ReactNode, useCallback, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { ItemCheckbox } from './_components/ItemCheckbox'
import { ItemNoData } from './_components/ItemNoData'
import { CosDropdownFilter } from './CosDropdownFilter'
import { CosDropdownContext } from './cosDropdownContext'
import { menu } from './cosDropdownStyles'
import { checkIsCosDropdownItemElement } from './cosDropdownUtils'

export type CosDropdownMenuProps = {
  children: ReactNode
}

export const CosDropdownMenu = (props: CosDropdownMenuProps) => {
  const { children } = props

  const {
    floatingProps,
    dropdownOpen,
    size,
    variant,
    type,
    onAllCheckChange,
    selectedItems,
    enabledItemCount,
    searchValue,
  } = useContext(CosDropdownContext)

  const { elementRef, resolvedStyles } = floatingProps

  const isAllSelected = useMemo(() => {
    return selectedItems.length === enabledItemCount
  }, [selectedItems.length, enabledItemCount])

  const onAllClick = useCallback(() => {
    onAllCheckChange?.(!isAllSelected)
  }, [isAllSelected, onAllCheckChange])

  const renderFilter = () => {
    if (variant === 'regular') return null
    return <CosDropdownFilter />
  }

  const renderSelectAllCheckbox = () => {
    if (type === 'radio' || searchValue || !children) return null

    return (
      <ItemCheckbox
        isDark={true}
        size={size}
        variant={variant}
        label="All"
        onClick={onAllClick}
        isSelected={isAllSelected}
        disabled={false}
      />
    )
  }

  const renderMenuItems = () => {
    const allItems = Children.toArray(children).filter(
      checkIsCosDropdownItemElement,
    )

    const visibleItems =
      variant !== 'withFilter' || !searchValue
        ? allItems
        : allItems.filter((child) =>
            child.props.children
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          )

    if (visibleItems.length === 0) {
      return <ItemNoData size={size} type={type} />
    }

    return visibleItems
  }

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(menu({ size, dropdownOpen }))}
      style={resolvedStyles?.floatingStyle}
    >
      {renderFilter()}
      {renderSelectAllCheckbox()}
      {renderMenuItems()}
    </div>,
    document.body,
  )
}
