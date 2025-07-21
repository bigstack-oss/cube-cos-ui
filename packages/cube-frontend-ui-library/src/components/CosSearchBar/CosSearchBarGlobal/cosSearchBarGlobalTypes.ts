import { ComponentProps, ReactElement } from 'react'
import { CosSearchBarGlobalItem } from './CosSearchBarGlobalItem'

export type CosSearchBarGlobalItemType = 'suggestion' | 'recentSuggestion'

export type CosSearchBarGlobalVariant = CosSearchBarGlobalProps['variant']

type BaseSearchBarGlobalProps = ComponentProps<'input'> & {
  variant: 'regular' | 'sorting'
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

export type SortingSearchBarGlobalProps = BaseSearchBarGlobalProps & {
  variant: 'sorting'
  categories: string[]
  selectedCategory: string | undefined
  onCategoryClick: (category: string) => void
}

export type CosSearchBarGlobalProps =
  | RegularSearchBarGlobalProp
  | SortingSearchBarGlobalProps
