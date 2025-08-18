import { createContext } from 'react'

type GlobalSearchContext = {
  keyword: string
  debouncedKeyword: string
  suggestions: string[]
  setKeyword: (keyword: string) => void
  clearKeyword: () => void
  removeSuggestion: (suggestion: string) => void
}

export const GlobalSearchContext = createContext<GlobalSearchContext>({
  keyword: '',
  suggestions: [],
  debouncedKeyword: '',
  setKeyword: () => {},
  clearKeyword: () => {},
  removeSuggestion: () => {},
})
