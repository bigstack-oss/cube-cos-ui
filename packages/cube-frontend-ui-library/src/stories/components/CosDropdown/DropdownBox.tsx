import { PropsWithChildren } from 'react'

export type DropdownBoxProps = PropsWithChildren<{
  title: string
}>

export const DropdownBox = (props: DropdownBoxProps) => {
  const { children, title } = props
  return (
    <div className="grid h-[70px] grid-cols-5 items-start gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children}
    </div>
  )
}
