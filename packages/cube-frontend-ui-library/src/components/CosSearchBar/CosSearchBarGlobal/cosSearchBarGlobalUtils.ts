import { ComponentProps } from 'react'
import {
  CosSearchBarGlobalProps,
  SortingSearchBarGlobalProps,
} from './cosSearchBarGlobalTypes'

export const omitNonInputProps = (
  props: CosSearchBarGlobalProps,
): ComponentProps<'input'> => {
  const { variant, isLoading, children, onInputClear, ...restProps } = props

  if (variant === 'sorting') {
    const { categories, selectedCategory, onCategoryClick, ...inputProps } =
      restProps as SortingSearchBarGlobalProps
    return inputProps
  }

  return restProps
}
