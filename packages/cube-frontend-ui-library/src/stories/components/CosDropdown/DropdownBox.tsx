import { PropsWithChildren } from 'react'

export type DropdownBoxProps = PropsWithChildren<{
  title: string
}>

export const DropdownBox = (props: DropdownBoxProps) => {
  const { children, title } = props
  return (
    <div className="grid grid-cols-4 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children}
    </div>
  )
}
