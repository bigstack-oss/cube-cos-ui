import { twMerge } from 'tailwind-merge'
import { CosSearchBarSkeleton } from '../CosSearchBarSkeleton'
import { CosSearchBarGlobalItem } from './CosSearchBarGlobalItem'
import { GlobalSearchBarInput } from './GlobalSearchBarInput'
import { GlobalSearchBarCategory } from './GlobalSearchBarCategory'
import { CosSearchBarGlobalProps } from './cosSearchBarGlobalTypes'
import { container } from './cosSearchBarGlobalStyles'
import { omitNonInputProps } from './cosSearchBarGlobalUtils'

export const CosSearchBarGlobal = (props: CosSearchBarGlobalProps) => {
  const { variant, isLoading = false, onInputClear, children } = props

  if (isLoading) return <CosSearchBarSkeleton variant="global" />

  const renderCategoryDropdown = () => {
    if (variant !== 'category') return null

    const { categories, selectedCategory, onCategoryClick } = props

    return (
      <GlobalSearchBarCategory
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
      />
    )
  }

  return (
    <div className={twMerge(container)}>
      <GlobalSearchBarInput
        {...omitNonInputProps(props)}
        variant={variant}
        onInputClear={onInputClear}
      >
        {children}
      </GlobalSearchBarInput>
      {renderCategoryDropdown()}
    </div>
  )
}

CosSearchBarGlobal.Item = CosSearchBarGlobalItem
