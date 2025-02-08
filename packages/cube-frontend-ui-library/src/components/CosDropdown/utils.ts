import {
  Children,
  isValidElement,
  ReactNode,
  ChangeEvent,
  ReactElement,
} from 'react'
import { Placement } from '../../internal/utils/floating/types'
import { CosDropdownProps } from './CosDropdown'
import { CosDropdownTrigger } from './CosDropdownTrigger'
import { CosDropdownMenu, CosDropdownMenuProps } from './CosDropdownMenu'

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

export const parseNodes = (
  node: ReactNode,
): {
  triggerNode: ReactNode
  menuNode: ReactNode
  validItemCount: number
} => {
  const children = Children.toArray(node)

  const triggerNode = children.find(
    (child) => isValidElement(child) && child.type === CosDropdownTrigger,
  )

  const menuNode = children.find(
    (child) => isValidElement(child) && child.type === CosDropdownMenu,
  )

  const menuChildren =
    menuNode && isValidElement(menuNode)
      ? Children.toArray(
          (menuNode as React.ReactElement<CosDropdownMenuProps>).props.children,
        )
      : []

  const menuValidChildren = menuChildren.filter(
    (child) =>
      isValidElement(child) &&
      !(child as ReactElement<{ disabled?: boolean }>).props.disabled,
  ) as ReactElement[]

  const validItemCount = menuValidChildren.length

  return { triggerNode, menuNode, validItemCount }
}

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
  } as const
}
