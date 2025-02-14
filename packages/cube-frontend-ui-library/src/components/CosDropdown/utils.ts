import { ChangeEvent } from 'react'
import { Placement } from '../../internal/utils/floating/types'
import { CosDropdownProps } from './CosDropdown'

export type CosDropdownType =
  | 'regular'
  | 'checkbox'
  | 'search'
  | 'search-checkbox'

export type CosDropdownVariant = 'default' | 'in-table'

export type OnAllCheckChange = (checked: boolean) => void

export type OnClearClick = () => void

export type OnSearchChange = (e: ChangeEvent<HTMLInputElement>) => void

export const dropdownPlacement = 'bottom-left' satisfies Placement

export const getOptionalProps = <Item, Type extends CosDropdownType>(
  props: CosDropdownProps<Item, Type>,
) => {
  const { type = 'regular' } = props

  const isCheckboxDropdown = type === 'checkbox' || type === 'search-checkbox'

  const isSearchDropdown = type === 'search' || type === 'search-checkbox'

  return {
    onAllCheckChange:
      isCheckboxDropdown && 'onAllCheckChange' in props
        ? (props.onAllCheckChange as OnAllCheckChange)
        : undefined,
    searchValue:
      isSearchDropdown && 'searchValue' in props
        ? (props.searchValue as string)
        : undefined,
    onSearchChange:
      isSearchDropdown && 'onSearchChange' in props
        ? (props.onSearchChange as OnSearchChange)
        : undefined,
    onClearClick:
      isSearchDropdown && 'onClearClick' in props
        ? (props.onClearClick as OnClearClick)
        : undefined,
  }
}
