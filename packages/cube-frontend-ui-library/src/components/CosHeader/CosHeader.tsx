import { CosSearchBarGlobal, CosStroke } from '@cube-frontend/ui-library'
import { QuickAccessBar, QuickAccessBarProps } from './QuickAccessBar'
import { FunctionBar, FunctionBarItem } from './FunctionBar'
import { useEffect, useRef, useState } from 'react'
import { mockCategories } from '../../stories/components/CosSearchBar/mockData'

export type CosHeaderProps = QuickAccessBarProps & {
  keyword: string
  suggestions: string[]
  onKeywordChange: (keyword: string) => void
  onKeywordClear: () => void
  onRemoveSuggestion: (suggestion: string) => void
  functionBarItems: FunctionBarItem[]
}

// TODO: implement notification and logout overflow menu.
export const CosHeader = (props: CosHeaderProps) => {
  const {
    isLoading,
    quickAccesses,
    functionBarItems,
    keyword,
    suggestions,
    onKeywordChange,
    onKeywordClear,
    onRemoveSuggestion,
  } = props

  const globalSearchInputRef = useRef<HTMLInputElement>(null)

  const focusGlobalSearch = () => {
    const inputs = ['input', 'select', 'button', 'textarea']

    if (
      document.activeElement &&
      inputs.indexOf(document.activeElement.tagName.toLowerCase()) !== -1
    ) {
      return
    }

    setTimeout(() => {
      globalSearchInputRef.current?.focus()
    }, 0)
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const keyName = event.key

      if (keyName === '/') {
        focusGlobalSearch()
      }

      if (event.metaKey && keyName === 'k') {
        focusGlobalSearch()
      }

      if (event.key === 'Escape') {
        onKeywordClear()
        globalSearchInputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handler, false)

    return () => {
      document.removeEventListener('keydown', handler, false)
    }
  }, [onKeywordClear])

  const [category, setCategory] = useState<string>()
  const handleCategoryClick = (category: string) => setCategory(category)

  return (
    <div className="relative flex h-[54px] flex-row items-center justify-between px-5">
      <div className="w-[500px]">
        <CosSearchBarGlobal
          ref={globalSearchInputRef}
          variant="sorting"
          placeholder="Search"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onInputClear={onKeywordClear}
          categories={mockCategories}
          selectedCategory={category}
          onCategoryClick={handleCategoryClick}
        >
          {suggestions.map((recentSuggestion) => (
            <CosSearchBarGlobal.Item
              key={recentSuggestion}
              type="recentSuggestion"
              onClick={() => onKeywordChange(recentSuggestion)}
              onSuggestionClear={() => onRemoveSuggestion(recentSuggestion)}
            >
              {recentSuggestion}
            </CosSearchBarGlobal.Item>
          ))}
        </CosSearchBarGlobal>
      </div>
      <div className="flex items-center justify-end gap-x-2.5">
        <QuickAccessBar isLoading={isLoading} quickAccesses={quickAccesses} />
        <div className="h-6 w-px bg-functional-border-divider" />
        <FunctionBar items={functionBarItems} />
        <div className="absolute bottom-0 left-0 w-full px-5">
          <CosStroke />
        </div>
      </div>
    </div>
  )
}
