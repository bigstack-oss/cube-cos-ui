import { PropsWithChildren } from 'react'

export type StatusRowProps = PropsWithChildren<{
  title: string
}>

export const StatusRow = (props: StatusRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center">
      <h3 className="secondary-h3 w-32 shrink-0">{title}</h3>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  )
}
