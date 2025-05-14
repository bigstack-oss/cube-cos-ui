import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import Search from '../../components/CosIcon/monochrome/search.svg?react'
import { CosDropdownContext } from './cosDropdownContext'
import { filter } from './cosDropdownStyles'

export const CosDropdownFilter = () => {
  const { size, type, searchValue, handleSearchValueChange } =
    useContext(CosDropdownContext)

  return (
    <div className={twMerge(filter.container({ size, type }))}>
      <input
        type="text"
        className={twMerge(filter.input)}
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <Search className={twMerge(filter.icon({ size, type }))} />
    </div>
  )
}
