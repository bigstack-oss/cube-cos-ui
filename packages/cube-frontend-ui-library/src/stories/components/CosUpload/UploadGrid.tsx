import { PropsWithChildren } from 'react'

type UploadGridProps = PropsWithChildren<{
  title: string
}>

export const UploadGrid = (props: UploadGridProps) => {
  const { children, title } = props

  return (
    <div className="mb-10 grid grid-cols-5 gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-4">{children}</div>
    </div>
  )
}
