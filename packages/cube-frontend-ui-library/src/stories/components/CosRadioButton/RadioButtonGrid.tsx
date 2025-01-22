import { PropsWithChildren } from 'react'

export type RadioButtonGridProps = PropsWithChildren<{
  title: string
}>

export const RadioButtonGrid = (props: RadioButtonGridProps) => {
  const { children, title } = props
  return (
    <div className="grid grid-cols-4 gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children}
    </div>
  )
}
