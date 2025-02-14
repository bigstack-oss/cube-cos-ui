import { createContext } from 'react'
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
  onDropdownOpenChange: () => void
  // Common props
  type: CosDropdownType
  variant: CosDropdownVariant
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
  onDropdownOpenChange: () => {},
  // Common props
  type: 'regular',
  variant: 'default',
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
