import { ReactNode } from 'react'

export type CosDropdownSize = 'sm' | 'md'

export type CosDropdownType = 'radio' | 'checkbox'

export type CosDropdownVariant = 'regular' | 'withFilter'

export type OnAllCheckChange = (checked: boolean) => void

export type OnClearSelection = () => void

type CosDropdownBaseProps<Item> = {
  /**
   * @default 'md'
   */
  size?: CosDropdownSize
  type: CosDropdownType
  /**
   * @default "regular"
   */
  variant?: CosDropdownVariant
  selectedItems: Item[]
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * @default false
   */
  disabled?: boolean
  label?: string
  skeletonClassName?: string
  children: ReactNode
}

type CheckboxPropsWithFilter<Item> = CosDropdownBaseProps<Item> & {
  type: 'checkbox'
  variant: 'withFilter'
  onAllCheckChange: OnAllCheckChange
  onClearSelection: OnClearSelection
}

type CheckboxPropsRegular<Item> = CosDropdownBaseProps<Item> & {
  type: 'checkbox'
  variant?: Exclude<CosDropdownVariant, 'withFilter'>
  onAllCheckChange: OnAllCheckChange
  onClearSelection?: never
}

type RadioProps<Item> = CosDropdownBaseProps<Item> & {
  type: 'radio'
  variant?: CosDropdownVariant
  onAllCheckChange?: never
  onClearSelection?: never
}

export type CosDropdownProps<Item> =
  | CheckboxPropsWithFilter<Item>
  | CheckboxPropsRegular<Item>
  | RadioProps<Item>
