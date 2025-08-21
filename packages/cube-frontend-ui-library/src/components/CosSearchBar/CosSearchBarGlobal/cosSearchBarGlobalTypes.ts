import { ComponentProps, ReactElement } from 'react'
import { CosSearchBarGlobalItem } from './CosSearchBarGlobalItem'

export type CosSearchBarGlobalItemType = 'suggestion' | 'recentSuggestion'

export type CosSearchBarGlobalVariant = CosSearchBarGlobalProps['variant']

type BaseSearchBarGlobalProps = ComponentProps<'input'> & {
  variant: 'regular' | 'category'
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * `children` is used to render menu content items,
   * it should be `CosSearchBarGlobalItem` components.
   */
  children?:
    | ReactElement<typeof CosSearchBarGlobalItem>[]
    | ReactElement<typeof CosSearchBarGlobalItem>
  onInputClear: () => void
}

type RegularSearchBarGlobalProp = BaseSearchBarGlobalProps & {
  variant: 'regular'
}

export type CategorySearchBarGlobalProps = BaseSearchBarGlobalProps & {
  variant: 'category'
  categories: string[]
  selectedCategory: string | undefined
  onCategoryClick: (category: string) => void
}

export type CosSearchBarGlobalProps =
  | RegularSearchBarGlobalProp
  | CategorySearchBarGlobalProps
