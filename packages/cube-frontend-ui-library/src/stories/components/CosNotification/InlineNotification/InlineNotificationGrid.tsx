import { PropsWithChildren } from 'react'

type InlineNotificationGridProps = PropsWithChildren<{
  title?: string
}>

export const InlineNotificationGrid = (props: InlineNotificationGridProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-5 items-center gap-6 [&:not(:last-child)]:mb-6">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-4">{children}</div>
    </div>
  )
}
