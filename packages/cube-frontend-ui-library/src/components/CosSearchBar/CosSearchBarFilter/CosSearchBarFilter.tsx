import {
  InputHTMLAttributes,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { useFloating } from '../../../internal/utils/floating/useFloating'
import Search from '../../CosIcon/monochrome/search.svg?react'
import Clear from '../../CosIcon/monochrome/x_small.svg?react'
import { CosSearchBarSkeleton } from '../CosSearchBarSkeleton'
import { FilterDropdownMenu } from './FilterDropdownMenu'
import { FilterDropdownItem } from './FilterDropdownItem'

const input = cva(
  [
    'primary-body2 w-full truncate rounded-[5px] bg-grey-100',
    'box-border border border-grey-100 py-[7px] pl-4',
    'text-functional-text placeholder:text-functional-text-light',
    'outline-none hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      hasInputValue: {
        true: 'pr-[56px]',
        false: 'pr-9',
      },
    },
  },
)

export type CosSearchBarFilterProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<HTMLInputElement>
  isLoading?: boolean
  onInputClear?: () => void
  showDropdown?: boolean
  /**
   * `children` is used to render menu content items,
   * it should be `FilterDropdownItem` components.
   */
  children?:
    | ReactElement<typeof FilterDropdownItem>[]
    | ReactElement<typeof FilterDropdownItem>
}

export const CosSearchBarFilter = (props: CosSearchBarFilterProps) => {
  const {
    children,
    ref: inputRef,
    isLoading,
    onInputClear,
    showDropdown = true,
    value,
    onChange: onInputChange,
    className,
    placeholder = 'Search Key-Value',
    ...restProps
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const defaultId = useId()

  const inputId = restProps.id || defaultId

  const hasInputValue = !!value && value !== ''

  useEffect(() => {
    if (hasInputValue) {
      setDropdownOpen(true)
    } else {
      setDropdownOpen(false)
    }
  }, [hasInputValue])

  const floatingProps = useFloating<HTMLDivElement, HTMLDivElement>({
    placement: 'bottom-left',
    autoPlacement: true,
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

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

  const handleClearClick = () => {
    if (onInputClear) {
      onInputClear()
    }
  }

  const renderIcon = () => (
    <span className="absolute right-4 flex items-center gap-[6px]">
      {hasInputValue && (
        <Clear
          className="icon-md text-functional-text-light"
          onClick={handleClearClick}
        />
      )}
      <Search className="icon-md text-functional-text" />
    </span>
  )

  if (isLoading) return <CosSearchBarSkeleton variant="filter" />

  return (
    <>
      <div ref={anchorRef} className="relative flex min-w-[200px] items-center">
        <input
          {...restProps}
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder={placeholder}
          className={twMerge(input({ hasInputValue }), className)}
        />
        {renderIcon()}
      </div>
      <FilterDropdownMenu
        dropdownOpen={dropdownOpen && showDropdown}
        floatingProps={floatingProps}
      >
        {children}
      </FilterDropdownMenu>
    </>
  )
}

CosSearchBarFilter.Item = FilterDropdownItem
