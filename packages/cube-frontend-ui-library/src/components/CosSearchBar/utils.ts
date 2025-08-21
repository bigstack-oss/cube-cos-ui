import {
  Children,
  ComponentType,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'

export const checkIsDropdownChildValid = <P>(
  children: ReactNode,
  expectedType: ComponentType<P>,
): children is ReactElement<P> | ReactElement<P>[] => {
  if (!children) return false

  const childArray = Children.toArray(children)

  if (childArray.length === 0) return false

  return childArray.every(
    (child) => isValidElement(child) && child.type === expectedType,
  )
}
