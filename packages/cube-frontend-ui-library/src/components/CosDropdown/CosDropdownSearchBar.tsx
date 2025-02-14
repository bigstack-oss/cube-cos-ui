import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import Search from '../../components/CosIcon/monochrome/search.svg?react'
import { CosDropdownContext } from './context'

export const CosDropdownSearchBar = () => {
  const { searchValue, onSearchChange } = useContext(CosDropdownContext)

  return (
    <div className="relative flex items-center px-[22px] py-[5px]">
      <input
        type="text"
        className={twMerge(
          'primary-body2 rounded-[5px] px-4 py-[7px] outline-none',
          'bg-secondary-0 text-functional-text placeholder:text-functional-text-light',
        )}
        placeholder="Search Key-Value"
        value={searchValue}
        onChange={onSearchChange}
      />
      <Search className="icon-md absolute right-[38px] shrink-0 text-functional-text" />
    </div>
  )
}
