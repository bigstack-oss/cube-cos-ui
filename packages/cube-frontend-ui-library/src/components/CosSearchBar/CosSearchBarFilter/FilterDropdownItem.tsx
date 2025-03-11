import { ReactNode } from 'react'

type FilterDropdownItemProps = {
  children: ReactNode
  onClick?: () => void
}

export const FilterDropdownItem = (props: FilterDropdownItemProps) => {
  const { children, onClick } = props

  return (
    <div
      className="primary-body3 px-4 py-[10px] hover:bg-functional-hover-secondary"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
