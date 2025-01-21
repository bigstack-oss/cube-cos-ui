import { useContext } from 'react'
import { CosDropdownContext } from './cosDropdownUtils'
import { twMerge } from 'tailwind-merge'

// TODO: implement dropdown filter
export const CosDropdownFilter = () => {
  const { filterValue, setFilterValue } = useContext(CosDropdownContext)
  return (
    <div className="relative flex px-[22px] py-[5px]">
      <input
        type="text"
        className={twMerge(
          'primary-body2 rounded-[5px] px-4 py-[7px] outline-none',
          'bg-secondary-0 text-functional-text placeholder:text-functional-text-light',
        )}
        placeholder="Filter options"
        value={filterValue}
        onChange={(e) => setFilterValue?.(e.target.value)}
      />
    </div>
  )
}
