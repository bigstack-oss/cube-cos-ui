import { PropsWithChildren } from 'react'
import { CosDropdownSize } from '../../../components/CosDropdown/cosDropdownTypes'
import { RadioDropdown } from './RadioDropdown'
import { CheckboxDropdown } from './CheckboxDropdown'

export const DropdownLayout = (
  props: PropsWithChildren<{
    title: string
  }>,
) => {
  const { children, title } = props
  return (
    <div className="my-4 grid grid-cols-5 items-center gap-12">
      <div className="primary-body2 col-span-1">{title}</div>
      {children}
    </div>
  )
}

export const DropdownRowHeader = () => (
  <>
    <p className="primary-body2 col-span-1">Regular</p>
    <p className="primary-body2 col-span-1">Regular w/Filter</p>
    <p className="primary-body2 col-span-1">Checkbox</p>
    <p className="primary-body2 col-span-1">Checkbox w/Filter</p>
  </>
)

export const DropdownRow = (props: {
  size: CosDropdownSize
  isLoading: boolean
  selected: boolean
  disabled: boolean
  label?: string
}) => {
  return (
    <>
      <RadioDropdown {...props} variant="regular" />
      <RadioDropdown {...props} variant="withFilter" />
      <CheckboxDropdown {...props} variant="regular" />
      <CheckboxDropdown {...props} variant="withFilter" />
    </>
  )
}
