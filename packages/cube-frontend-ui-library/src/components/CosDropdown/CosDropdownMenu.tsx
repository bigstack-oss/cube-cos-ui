import { ReactNode, useCallback, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { ItemCheckbox } from './_components/ItemCheckbox'
import { CosDropdownFilter } from './CosDropdownFilter'
import { CosDropdownContext } from './cosDropdownContext'
import { menu } from './cosDropdownStyles'

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
    if (type === 'radio' || searchValue) return null

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

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(menu({ size, dropdownOpen }))}
      style={resolvedStyles?.floatingStyle}
    >
      {renderFilter()}
      {renderSelectAllCheckbox()}
      {children}
    </div>,
    document.body,
  )
}
