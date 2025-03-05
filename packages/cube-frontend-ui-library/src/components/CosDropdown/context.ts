import { createContext } from 'react'
import { UseFloating } from '../../internal/utils/floating/useFloating'
import {
  CosDropdownType,
  CosDropdownVariant,
  OnAllCheckChange,
  OnClearClick,
  OnSearchChange,
} from './utils'

export type CosDropdownContextValue<Item> = {
  // Internal control
  dropdownOpen: boolean
  toggleDropdownOpen: () => void
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>
  // Common props
  type: CosDropdownType
  variant: CosDropdownVariant
  isPagination: boolean
  selectedItems: Item[]
  itemCount: number
  disabled: boolean
  // Checkbox props
  onAllCheckChange: OnAllCheckChange | undefined
  onClearClick: OnClearClick | undefined
  // Search props
  searchValue: string | undefined
  onSearchChange: OnSearchChange | undefined
}

export const CosDropdownContext = createContext<
  CosDropdownContextValue<unknown>
>({
  // Internal control
  dropdownOpen: false,
  toggleDropdownOpen: () => {},
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,
  // Common props
  type: 'regular',
  variant: 'default',
  isPagination: false,
  selectedItems: [],
  itemCount: 0,
  disabled: false,
  // Checkbox props
  onAllCheckChange: undefined,
  onClearClick: undefined,
  // Search props
  searchValue: undefined,
  onSearchChange: undefined,
})
