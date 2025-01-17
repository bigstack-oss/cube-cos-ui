import { PropsWithChildren, ReactNode } from 'react'

export type NaggingBoxProps = PropsWithChildren<{
  title: string
  description?: string
}>

export const NaggingBoxForSidebar = (props: NaggingBoxProps) => {
  const { children, title, description } = props

  return (
    <div className="grid grid-cols-6 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-3 flex space-x-6">{children}</div>
      {description && (
        <div className="primary-body3 col-span-2 text-functional-text-light">
          {description}
        </div>
      )}
    </div>
  )
}

export const NaggingBoxForTop = (props: NaggingBoxProps) => {
  const { children, title, description } = props

  return (
    <div className="grid grid-cols-6 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-5 space-y-6">
        {children}
        {description && (
          <div className="primary-body3 whitespace-pre-line text-functional-text-light">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

export const NaggingRowForTop = (props: {
  children: ReactNode
  title: string
}) => {
  const { children, title } = props
  return (
    <div className="grid grid-cols-5 items-center">
      <div className="primary-body2">{title}</div>
      <div className="col-span-4">{children}</div>
    </div>
  )
}
