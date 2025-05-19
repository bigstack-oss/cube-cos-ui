import { PropsWithChildren } from 'react'

export type BreadcrumbGridProps = PropsWithChildren<{
  title: string
}>

export const BreadcrumbGrid = (props: BreadcrumbGridProps) => {
  const { children, title } = props

  return (
    <div className="my-4 grid grid-cols-4 gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
