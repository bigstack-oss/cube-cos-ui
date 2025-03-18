import { PropsWithChildren } from 'react'

type TextAreaGridProps = PropsWithChildren<{
  title: string
}>

export const TextAreaGrid = (props: TextAreaGridProps) => {
  const { children, title } = props

  return (
    <div className="mb-6 grid grid-cols-4 gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="w-[280px]">{children}</div>
    </div>
  )
}
