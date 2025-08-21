import {
  ComponentProps,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import Search from '../../CosIcon/monochrome/search.svg?react'
import Clear from '../../CosIcon/monochrome/x_small.svg?react'
import { useFloating } from '../../../internal/utils/floating/useFloating'
import { keyword } from './cosSearchBarGlobalStyles'
import { CosSearchBarGlobalVariant } from './cosSearchBarGlobalTypes'
import { checkIsDropdownChildValid } from '../utils'
import { CosSearchBarGlobalItem } from './CosSearchBarGlobalItem'

type GlobalSearchBarInputProps = ComponentProps<'input'> & {
  variant: CosSearchBarGlobalVariant
  onInputClear: () => void
  children?:
    | ReactElement<typeof CosSearchBarGlobalItem>[]
    | ReactElement<typeof CosSearchBarGlobalItem>
}

export const GlobalSearchBarInput = (props: GlobalSearchBarInputProps) => {
  const {
    variant,
    children,
    ref: inputRef,
    value,
    placeholder = 'Search',
    className,
    onChange: onInputChange,
    onInputClear,
    ...restProps
  } = props

  const [keywordDropdownOpen, setKeywordDropdownOpen] = useState(false)

  const hasInputValue = typeof value === 'string' && value.trim() !== ''

  const hasMenuItems = checkIsDropdownChildValid(
    children,
    CosSearchBarGlobalItem,
  )

  useEffect(() => {
    setKeywordDropdownOpen(hasInputValue)
  }, [hasInputValue, setKeywordDropdownOpen])

  const keywordDropdownFloatingProps = useFloating<
    HTMLDivElement,
    HTMLDivElement
  >({
    isOpen: hasMenuItems && hasInputValue && keywordDropdownOpen,
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef, resolvedStyles } = keywordDropdownFloatingProps

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        setKeywordDropdownOpen(false)
      }
    },
    [anchorRef, elementRef, setKeywordDropdownOpen],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderIcon = () => (
    <span className="absolute right-4 flex items-center gap-[6px]">
      {hasInputValue && (
        <Clear
          className="icon-md cursor-pointer text-functional-text-light"
          onClick={onInputClear}
        />
      )}
      <Search className="icon-md text-functional-text" />
    </span>
  )

  const renderMenu = () => {
    if (!children) return null
    return createPortal(
      <div
        ref={elementRef}
        className={twMerge(keyword.menu)}
        style={resolvedStyles?.floatingStyle}
      >
        {children}
      </div>,
      document.body,
    )
  }

  return (
    <div className="w-full">
      <div
        ref={keywordDropdownFloatingProps.anchorRef}
        className="relative flex w-full items-center"
      >
        <input
          {...restProps}
          ref={inputRef}
          type="text"
          value={value ?? ''}
          onChange={onInputChange}
          placeholder={placeholder}
          autoComplete="off"
          className={twMerge(
            keyword.input({ variant, hasInputValue }),
            className,
          )}
        />
        {renderIcon()}
      </div>
      {renderMenu()}
    </div>
  )
}
