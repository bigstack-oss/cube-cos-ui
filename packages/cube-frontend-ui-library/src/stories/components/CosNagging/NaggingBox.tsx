import { PropsWithChildren } from 'react'

export type NaggingBoxProps = PropsWithChildren<{
  title: string
  description?: string
}>

export const NaggingBoxForSidebar = (props: NaggingBoxProps) => {
  const { children, title, description } = props

  return (
    <div className="grid grid-cols-5 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-2">{children}</div>
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
    <>
      <div className="grid grid-cols-5 items-center gap-12">
        <div className="primary-body2 col-span-1 font-medium">{title}</div>
        <div className="col-span-4">{children}</div>
      </div>
      {description && (
        <div className="primary-body3 col-span-2 text-functional-text-light">
          {description}
        </div>
      )}
    </>
  )
}
