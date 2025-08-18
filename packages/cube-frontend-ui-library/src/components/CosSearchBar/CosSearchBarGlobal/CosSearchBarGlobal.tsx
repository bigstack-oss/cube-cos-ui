import { twMerge } from 'tailwind-merge'
import { CosSearchBarSkeleton } from '../CosSearchBarSkeleton'
import { CosSearchBarGlobalItem } from './CosSearchBarGlobalItem'
import { GlobalSearchBarInput } from './GlobalSearchBarInput'
import { GlobalSearchBarSorting } from './GlobalSearchBarSorting'
import { CosSearchBarGlobalProps } from './cosSearchBarGlobalTypes'
import { container } from './cosSearchBarGlobalStyles'
import { omitNonInputProps } from './cosSearchBarGlobalUtils'

export const CosSearchBarGlobal = (props: CosSearchBarGlobalProps) => {
  const { ref, variant, isLoading = false, onInputClear, children } = props

  if (isLoading) return <CosSearchBarSkeleton variant="global" />

  const renderSortingDropdown = () => {
    if (variant !== 'sorting') return null

    const { categories, selectedCategory, onCategoryClick } = props

    return (
      <GlobalSearchBarSorting
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
      />
    )
  }

  return (
    <div className={twMerge(container)}>
      <GlobalSearchBarInput
        ref={ref}
        {...omitNonInputProps(props)}
        variant={variant}
        onInputClear={onInputClear}
      >
        {children}
      </GlobalSearchBarInput>
      {renderSortingDropdown()}
    </div>
  )
}

CosSearchBarGlobal.Item = CosSearchBarGlobalItem
