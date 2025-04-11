import { PropsWithChildren } from 'react'

type ToastNotificationGridProps = PropsWithChildren<{
  title?: string
}>

export const ToastNotificationGrid = (props: ToastNotificationGridProps) => {
  const { children: childrenProps, title } = props

  const children = Array.isArray(childrenProps)
    ? childrenProps
    : [childrenProps]

  return (
    <div className="grid grid-cols-5 items-center gap-6 [&:not(:last-child)]:mb-6">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children.map((child, index) => (
        <div key={index} className="col-span-2 flex justify-center">
          {child}
        </div>
      ))}
    </div>
  )
}
