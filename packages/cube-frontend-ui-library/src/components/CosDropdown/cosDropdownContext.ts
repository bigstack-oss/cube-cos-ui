import { ChangeEvent, createContext } from 'react'
import { UseFloating } from '../../internal/utils/floating/useFloating'
import {
  CosDropdownSize,
  CosDropdownType,
  CosDropdownVariant,
  OnAllCheckChange,
  OnClearSelection,
} from './cosDropdownTypes'

export type CosDropdownContextValue<Item> = {
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  dropdownOpen: boolean
  toggleDropdownOpen: () => void

  size: CosDropdownSize
  type: CosDropdownType
  variant: CosDropdownVariant
  disabled: boolean
  selectedItems: Item[]
  enabledItemCount: number

  onAllCheckChange?: OnAllCheckChange
  onClearSelection?: OnClearSelection

  searchValue?: string
  handleSearchValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CosDropdownContext = createContext<
  CosDropdownContextValue<unknown>
>({
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,
  dropdownOpen: false,
  toggleDropdownOpen: () => {},
  size: 'md',
  type: 'radio',
  variant: 'regular',
  disabled: false,
  selectedItems: [],
  enabledItemCount: 0,

  onAllCheckChange: undefined,
  onClearSelection: undefined,

  searchValue: '',
  handleSearchValueChange: undefined,
})
