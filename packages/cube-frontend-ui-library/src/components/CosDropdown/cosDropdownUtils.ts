import { createContext, Dispatch, SetStateAction } from 'react'

export type CosDropdownType = 'radio' | 'checkbox'

export type CosDropdownVariant = 'default' | 'in-table' | 'filter'

export type CosDropdownItemType = {
  key: string
  label: string
  disabled: boolean
}

export type CosDropdownContextType = {
  label?: string
  placeholder: string
  disabled: boolean
  isLoading: boolean

  variant: CosDropdownVariant
  type: CosDropdownType
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  selectedItems: CosDropdownItemType[]
  onSelectedItemsChange: (value: CosDropdownItemType) => void

  filterValue?: string
  setFilterValue: Dispatch<SetStateAction<string | undefined>>
}

export const defaultValue: CosDropdownContextType = {
  label: undefined,
  placeholder: 'Choose',
  disabled: false,
  isLoading: false,

  variant: 'default',
  type: 'radio',
  isOpen: false,
  onOpenChange: () => {},
  selectedItems: [],
  onSelectedItemsChange: () => {},

  filterValue: undefined,
  setFilterValue: () => {},
}

export const CosDropdownContext =
  createContext<CosDropdownContextType>(defaultValue)
