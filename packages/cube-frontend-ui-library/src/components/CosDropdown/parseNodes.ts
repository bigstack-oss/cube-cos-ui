import { Children, isValidElement, ReactElement, ReactNode } from 'react'
import { CosDropdownTrigger } from './CosDropdownTrigger'
import { CosDropdownMenu, CosDropdownMenuProps } from './CosDropdownMenu'
import { CosDropdownItem, CosDropdownItemProps } from './CosDropdownItem'

type NodePayload = {
  triggerNode: ReactNode
  menuNode: ReactNode
  enabledItemCount: number
}

export const parseNodes = (node: ReactNode): NodePayload => {
  const payload: NodePayload = {
    triggerNode: undefined,
    menuNode: undefined,
    enabledItemCount: 0,
  }

  Children.toArray(node).forEach((child) => {
    if (!isValidElement(child)) {
      return
    }

    if (child.type === CosDropdownTrigger) {
      assignTriggerNode(payload, child)
    } else if (child.type === CosDropdownMenu) {
      assignMenuNode(payload, child as ReactElement<CosDropdownMenuProps>)
    }
  })

  return payload
}

const assignTriggerNode = (payload: NodePayload, value: ReactElement): void => {
  if (payload.triggerNode) {
    console.warn(
      'Found multiple trigger nodes. Only one trigger node is allowed in a CosDropdown.',
    )
  } else {
    payload.triggerNode = value
  }
}

const assignMenuNode = (
  payload: NodePayload,
  value: ReactElement<CosDropdownMenuProps>,
): void => {
  if (payload.menuNode) {
    console.warn(
      'Found multiple menu nodes. Only one menu node is allowed in a CosDropdown.',
    )
  } else {
    payload.menuNode = value
    payload.enabledItemCount = computeEnabledItemCount(
      Children.toArray(value.props.children),
    )
  }
}

const computeEnabledItemCount = (menuChildren: ReactNode[]): number => {
  const enabledItems = menuChildren.filter((child) => {
    if (!isValidElement(child) || child.type !== CosDropdownItem) {
      console.warn(
        'The children of CosDropdownMenu can only be CosDropdownItem, but found: ',
        child,
      )
      return false
    }
    const itemProps = child.props as CosDropdownItemProps
    return !itemProps.disabled
  })

  return enabledItems.length
}
