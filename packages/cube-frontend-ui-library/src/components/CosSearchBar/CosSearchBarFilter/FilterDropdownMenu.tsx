import { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { UseFloating } from '../../../internal/utils/floating/useFloating'
import { FilterDropdownItem } from './FilterDropdownItem'

const menu = cva(
  [
    'absolute z-10 min-w-[200px] overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      isVisible: {
        false: 'invisible',
      },
    },
  },
)

type FilterDropdownMenuProps = {
  dropdownOpen: boolean
  floatingProps: UseFloating<HTMLDivElement, HTMLDivElement>
  /**
   * `children` is used to render menu content items,
   * it should be `FilterDropdownItem` components.
   */
  children?:
    | ReactElement<typeof FilterDropdownItem>[]
    | ReactElement<typeof FilterDropdownItem>
}

export const FilterDropdownMenu = (props: FilterDropdownMenuProps) => {
  const { dropdownOpen: isVisible, floatingProps, children } = props

  return createPortal(
    <div
      ref={floatingProps.elementRef}
      className={twMerge(menu({ isVisible }))}
      style={floatingProps.resolvedStyles?.floatingStyle}
    >
      {children}
    </div>,
    document.body,
  )
}
