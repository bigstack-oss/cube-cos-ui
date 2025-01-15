import { PropsWithChildren } from 'react'

export type InputBoxProps = PropsWithChildren<{
  title: string
}>

export const InputBox = (props: InputBoxProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-4 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children}
    </div>
  )
}
