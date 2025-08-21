import { ChangeEventHandler, useState } from 'react'
import { CosSearchBarFilter } from '../../../components/CosSearchBar/CosSearchBarFilter/CosSearchBarFilter'
import { mockOptions } from './mockData'

type SearchBarFilterProps = { isLoading: boolean; isNoData: boolean }

export const SearchBarFilter = (props: SearchBarFilterProps) => {
  const { isLoading, isNoData } = props

  const [searchValue, setSearchValue] = useState('')

  const handleSearchValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchValueClear = () => {
    setSearchValue('')
  }

  const renderOptions = () => {
    if (isNoData) return []

    return mockOptions
      .filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .map(({ label, option, description }) => (
        <CosSearchBarFilter.Item key={label}>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">{label}</div>
            <div className="col-span-1">{option}</div>
            <div className="col-span-1 font-medium text-primary">
              {description}
            </div>
          </div>
        </CosSearchBarFilter.Item>
      ))
  }

  return (
    <CosSearchBarFilter
      value={searchValue}
      onChange={handleSearchValueChange}
      onInputClear={handleSearchValueClear}
      isLoading={isLoading}
    >
      {renderOptions()}
    </CosSearchBarFilter>
  )
}
