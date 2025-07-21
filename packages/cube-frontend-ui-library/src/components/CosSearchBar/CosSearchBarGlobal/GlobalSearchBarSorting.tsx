import { Fragment, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ChevronDown from '../../CosIcon/monochrome/chevron_down.svg?react'
import { useFloating } from '../../../internal/utils/floating/useFloating'
import { sorting } from './cosSearchBarGlobalStyles'
import { createPortal } from 'react-dom'

type GlobalSearchBarSortingProps = {
  categories: string[]
  selectedCategory: string | undefined
  onCategoryClick: (category: string) => void
}

export const GlobalSearchBarSorting = (props: GlobalSearchBarSortingProps) => {
  const {
    categories,
    selectedCategory,
    onCategoryClick: onCategoryClickProp,
  } = props

  const [sortingDropdownOpen, setSortingDropdownOpen] = useState(false)

  const toggleDropdownOpen = () => {
    setSortingDropdownOpen((prev) => !prev)
  }

  const onCategoryClick = (cate: string) => {
    onCategoryClickProp(cate)
    setSortingDropdownOpen(false)
  }

  const sortingDropdownFloatingProps = useFloating<
    HTMLDivElement,
    HTMLDivElement
  >({
    isOpen: sortingDropdownOpen,
    placement: 'bottom-right',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef, resolvedStyles } = sortingDropdownFloatingProps

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        setSortingDropdownOpen(false)
      }
    },
    [anchorRef, elementRef, setSortingDropdownOpen],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderMenu = () => {
    return createPortal(
      <div
        ref={elementRef}
        className={twMerge(sorting.menu)}
        style={resolvedStyles?.floatingStyle}
      >
        {categories.map((cate) => (
          <div
            key={cate}
            className={twMerge(sorting.item)}
            onClick={() => onCategoryClick(cate)}
          >
            {cate}
          </div>
        ))}
      </div>,
      document.body,
    )
  }

  return (
    <Fragment>
      <div className="h-[20px] w-px border-l border-functional-border-divider" />
      <div ref={anchorRef}>
        <div className={twMerge(sorting.trigger)} onClick={toggleDropdownOpen}>
          <div className="primary-body2 max-w-[100px] truncate">
            {selectedCategory ?? 'Category'}
          </div>
          <ChevronDown
            className={sorting.triggerIcon({
              isOpen: sortingDropdownOpen,
            })}
          />
        </div>
      </div>
      {renderMenu()}
    </Fragment>
  )
}
