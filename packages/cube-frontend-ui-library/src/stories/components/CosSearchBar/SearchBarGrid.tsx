import { PropsWithChildren } from 'react'

export type SearchBarGridProps = PropsWithChildren<{
  title: string
}>

export const SearchBarGrid = (props: SearchBarGridProps) => {
  const { children, title } = props

  return (
    <div className="mt-6 grid grid-cols-4 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
