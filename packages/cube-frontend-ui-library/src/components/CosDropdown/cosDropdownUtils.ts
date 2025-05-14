import { CosDropdownProps } from './cosDropdownTypes'

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
