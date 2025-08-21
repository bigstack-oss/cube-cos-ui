import { Fragment, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ChevronDown from '../../CosIcon/monochrome/chevron_down.svg?react'
import { useFloating } from '../../../internal/utils/floating/useFloating'
import { category } from './cosSearchBarGlobalStyles'
import { createPortal } from 'react-dom'

type GlobalSearchBarCategoryProps = {
  categories: string[]
  selectedCategory: string | undefined
  onCategoryClick: (category: string) => void
}

export const GlobalSearchBarCategory = (
  props: GlobalSearchBarCategoryProps,
) => {
  const {
    categories,
    selectedCategory,
    onCategoryClick: onCategoryClickProp,
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdownOpen = () => {
    setDropdownOpen((prev) => !prev)
  }

  const onCategoryClick = (cate: string) => {
    onCategoryClickProp(cate)
    setDropdownOpen(false)
  }

  const categoryDropdownFloatingProps = useFloating<
    HTMLDivElement,
    HTMLDivElement
  >({
    isOpen: dropdownOpen,
    placement: 'bottom-right',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef, resolvedStyles } =
    categoryDropdownFloatingProps

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        setDropdownOpen(false)
      }
    },
    [anchorRef, elementRef, setDropdownOpen],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderItems = () => {
    const hasData = categories.length !== 0

    if (!hasData)
      return (
        <div className={twMerge(category.item({ hasData }))}>No Category</div>
      )
    return categories.map((cate) => (
      <div
        key={cate}
        className={twMerge(category.item({ hasData }))}
        onClick={() => onCategoryClick(cate)}
      >
        {cate}
      </div>
    ))
  }

  const renderMenu = () => {
    return createPortal(
      <div
        ref={elementRef}
        className={twMerge(category.menu)}
        style={resolvedStyles?.floatingStyle}
      >
        {renderItems()}
      </div>,
      document.body,
    )
  }

  return (
    <Fragment>
      <div className="h-[20px] w-px border-l border-functional-border-divider" />
      <div ref={anchorRef}>
        <div className={twMerge(category.trigger)} onClick={toggleDropdownOpen}>
          <div className="primary-body2 max-w-[100px] truncate">
            {selectedCategory ?? 'Category'}
          </div>
          <ChevronDown
            className={category.triggerIcon({
              isOpen: dropdownOpen,
            })}
          />
        </div>
      </div>
      {renderMenu()}
    </Fragment>
  )
}
