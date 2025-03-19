import { PropsWithChildren } from 'react'

export type StackCardGridProps = PropsWithChildren<{
  title: string
}>

export const StackCardGrid = (props: StackCardGridProps) => {
  const { children, title } = props
  return (
    <div className="my-4 grid grid-cols-4 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
