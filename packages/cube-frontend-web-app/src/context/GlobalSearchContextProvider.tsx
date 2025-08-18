import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { GlobalSearchContext } from './GlobalSearchContext'
import { useDebounce } from '../hooks/useDebounce'
import { useLocation } from 'react-router'

export const GlobalSearchContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const location = useLocation()

  const [keyword, setKeyword] = useState('')

  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(keyword, 1000)

  // TODO: history need a max size.
  const [searchHistory, setSearchHistory] = useState<Set<string>>(() => {
    const history = localStorage.getItem('globalSearchHistory')
    if (history) {
      return new Set(JSON.parse(history))
    }
    return new Set()
  })

  const suggestions = Array.from(searchHistory)
    .filter((history) => {
      if (history === keyword) return false
      return history.toLowerCase().includes(keyword.toLowerCase())
    })
    .slice(0, 5)

  const clearKeyword = useCallback(() => {
    setKeyword('')
    setDebouncedKeyword('')
  }, [setDebouncedKeyword])

  const removeSuggestion = (suggestion: string) => {
    setSearchHistory((s) => {
      const newSet = new Set(s)
      newSet.delete(suggestion)
      return newSet
    })
  }

  useEffect(() => {
    clearKeyword()
  }, [clearKeyword, location])

  const contextValue = useMemo(() => {
    return {
      keyword,
      debouncedKeyword,
      suggestions,
      setKeyword,
      clearKeyword,
      removeSuggestion,
    }
  }, [clearKeyword, debouncedKeyword, keyword, suggestions])

  useEffect(() => {
    if (debouncedKeyword) {
      setSearchHistory((s) => new Set([...s, debouncedKeyword]))
    }
  }, [debouncedKeyword])

  useEffect(() => {
    // TODO: localstorage must consider user and dataCenter.
    localStorage.setItem(
      'globalSearchHistory',
      JSON.stringify(Array.from(searchHistory)),
    )
  }, [searchHistory])

  return (
    <GlobalSearchContext.Provider value={contextValue}>
      {children}
    </GlobalSearchContext.Provider>
  )
}
