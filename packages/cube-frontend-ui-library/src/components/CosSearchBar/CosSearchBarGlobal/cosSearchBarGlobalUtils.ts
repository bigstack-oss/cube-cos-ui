import { ComponentProps } from 'react'
import {
  CosSearchBarGlobalProps,
  CategorySearchBarGlobalProps,
} from './cosSearchBarGlobalTypes'

export const omitNonInputProps = (
  props: CosSearchBarGlobalProps,
): ComponentProps<'input'> => {
  const { variant, isLoading, children, onInputClear, ...restProps } = props

  if (variant === 'category') {
    const { categories, selectedCategory, onCategoryClick, ...inputProps } =
      restProps as CategorySearchBarGlobalProps
    return inputProps
  }

  return restProps
}
