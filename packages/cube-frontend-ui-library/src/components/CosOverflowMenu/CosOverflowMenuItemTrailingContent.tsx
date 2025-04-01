import { ReactNode } from 'react'
import { CosToggle } from '../CosToggle/CosToggle'
import {
  CosOverflowMenuItemProps,
  CosOverflowMenuItemType,
  ItemWithToggle,
  ItemWithTrailingIcon,
  renderNothing,
} from './cosOverflowMenuItemUtils'

export const CosOverflowMenuItemTrailingContent = (
  props: CosOverflowMenuItemProps,
) => {
  const { type } = props

  const renderToggle = () => {
    const { disabled, isOn, onChange } = props as ItemWithToggle
    return (
      <CosToggle
        className="ml-8 shrink-0"
        isOn={isOn}
        disabled={disabled}
        onChange={onChange}
      />
    )
  }

  const renderTrailingIcon = () => {
    const { TrailingIcon } = props as ItemWithTrailingIcon
    return (
      <div className="shrink-0 px-2.5">
        <TrailingIcon className="icon-md text-functional-text group-[.group]:text-functional-disable-text" />
      </div>
    )
  }

  const renderFnMap: Record<CosOverflowMenuItemType, () => ReactNode> = {
    plain: renderNothing,
    'menu-icon': renderNothing,
    'check-mark': renderNothing,
    toggle: renderToggle,
    'trailing-icon': renderTrailingIcon,
    'custom-leading-element': renderNothing,
  }

  return !!type && renderFnMap[type]()
}
