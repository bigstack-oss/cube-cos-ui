import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import Search from '../../components/CosIcon/monochrome/search.svg?react'
import { CosDropdownContext } from './context'
import { search } from './styles'

export const CosDropdownSearchBar = () => {
  const { type, variant, searchValue, onSearchChange } =
    useContext(CosDropdownContext)

  if (type === 'regular' || type === 'checkbox') return

  return (
    <div className={twMerge(search.container({ type, variant }))}>
      <input
        type="text"
        className={twMerge(
          'primary-body2 w-full rounded-[5px] px-4 py-[7px] outline-none',
          'bg-secondary-0 text-functional-text placeholder:text-functional-text-light',
        )}
        placeholder="Search Key-Value"
        value={searchValue}
        onChange={onSearchChange}
      />
      <Search className={twMerge(search.icon({ type, variant }))} />
    </div>
  )
}
