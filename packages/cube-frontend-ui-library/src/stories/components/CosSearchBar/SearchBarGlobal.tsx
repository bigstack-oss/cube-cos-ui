import { ChangeEventHandler, useState } from 'react'
import { CosSearchBarGlobal } from '../../../components/CosSearchBar/CosSearchBarGlobal/CosSearchBarGlobal'
import { CosSearchBarGlobalVariant } from '../../../components/CosSearchBar/CosSearchBarGlobal/cosSearchBarGlobalTypes'
import {
  mockCategories,
  mockSuggestions,
  mockRecentSuggestions,
} from './mockData'

type SearchBarGlobalProps = {
  isLoading: boolean
  variant: CosSearchBarGlobalVariant
  isNoData: boolean
}

export const SearchBarGlobal = (props: SearchBarGlobalProps) => {
  const { isLoading, variant, isNoData } = props

  const [searchValue, setSearchValue] = useState('')

  const [selectedCategory, setSelectedCategory] = useState<string>()

  const handleSearchValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchValueClear = () => {
    setSearchValue('')
  }

  const handleCategoryClick = (category: string) =>
    setSelectedCategory(category)

  const showAlert = (action: string) => window.alert(action)

  const renderOptions = () => {
    if (isNoData) return []

    return [
      ...mockSuggestions
        .filter((suggestion) =>
          suggestion.value.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((suggestion) => (
          <CosSearchBarGlobal.Item
            key={suggestion.value}
            type="suggestion"
            onClick={() => showAlert('Suggestion selected!')}
          >
            {suggestion.value}
          </CosSearchBarGlobal.Item>
        )),
      ...mockRecentSuggestions
        .filter((suggestion) =>
          suggestion.value.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .map((recentSuggestion) => (
          <CosSearchBarGlobal.Item
            key={recentSuggestion.value}
            type="recentSuggestion"
            onClick={() => showAlert('Suggestion selected!')}
            onSuggestionClear={() => showAlert('Suggestion cleared!')}
          >
            {recentSuggestion.value}
          </CosSearchBarGlobal.Item>
        )),
    ]
  }

  if (variant === 'regular')
    return (
      <CosSearchBarGlobal
        isLoading={isLoading}
        variant="regular"
        value={searchValue}
        onChange={handleSearchValueChange}
        onInputClear={handleSearchValueClear}
      >
        {renderOptions()}
      </CosSearchBarGlobal>
    )

  return (
    <CosSearchBarGlobal
      isLoading={isLoading}
      variant="category"
      value={searchValue}
      categories={isNoData ? [] : mockCategories}
      selectedCategory={selectedCategory}
      onChange={handleSearchValueChange}
      onInputClear={handleSearchValueClear}
      onCategoryClick={handleCategoryClick}
    >
      {renderOptions()}
    </CosSearchBarGlobal>
  )
}
