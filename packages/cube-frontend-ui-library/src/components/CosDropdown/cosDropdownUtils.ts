import { isValidElement, ReactElement, ReactNode } from 'react'
import { CosDropdownProps } from './cosDropdownTypes'
import { CosDropdownItem, CosDropdownItemProps } from './CosDropdownItem'

export const getOptionalProps = <Item>(props: CosDropdownProps<Item>) => {
  return {
    onAllCheckChange:
      props.type === 'checkbox' ? props.onAllCheckChange : undefined,
    onClearSelection:
      props.type === 'checkbox' && props.variant === 'withFilter'
        ? props.onClearSelection
        : undefined,
  }
}

export const checkIsCosDropdownItemElement = (
  child: ReactNode,
): child is ReactElement<CosDropdownItemProps<unknown>> =>
  isValidElement(child) && child.type === CosDropdownItem
