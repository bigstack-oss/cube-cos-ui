import { ReactNode } from 'react'
import { SvgComponent } from '../CosIcon/CosIcon'
import { CosToggleProps } from '../CosToggle/CosToggle'

export type CosOverflowMenuItemProps = {
  title: string
  /**
   * @default false
   */
  boldTitle?: boolean
  subText?: string
} & (
  | PlainItem
  | ItemWithMenuIcon
  | ItemWithCheckMark
  | ItemWithToggle
  | ItemWithTrailingIcon
  | ItemWithCustomLeadingElement
)

type ClickableItemProps = {
  /**
   * @default false
   */
  disabled?: boolean
  onClick?: () => void
}

export type PlainItem = {
  type: 'plain'
} & ClickableItemProps

export type ItemWithMenuIcon = {
  type: 'menu-icon'
  MenuIcon: SvgComponent
} & ClickableItemProps

export type ItemWithCheckMark = {
  type: 'check-mark'
  isChecked: boolean
} & ClickableItemProps

export type ItemWithToggle = {
  type: 'toggle'
} & Pick<CosToggleProps, 'isOn' | 'onChange'> &
  ClickableItemProps

export type ItemWithTrailingIcon = {
  type: 'trailing-icon'
  TrailingIcon: SvgComponent
} & ClickableItemProps

export type ItemWithCustomLeadingElement = {
  type: 'custom-leading-element'
  element: ReactNode
} & ClickableItemProps

export type CosOverflowMenuItemType = NonNullable<
  CosOverflowMenuItemProps['type']
>

export const renderNothing = () => undefined
