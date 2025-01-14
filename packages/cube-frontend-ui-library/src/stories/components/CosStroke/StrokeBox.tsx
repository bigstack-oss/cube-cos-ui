import { PropsWithChildren } from 'react'

export type StrokeBoxProps = PropsWithChildren<{
  title: string
}>

export const StrokeBox = (props: StrokeBoxProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-4 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
