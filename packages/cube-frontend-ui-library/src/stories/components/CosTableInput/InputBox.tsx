import { PropsWithChildren } from 'react'

export type InputBoxProps = PropsWithChildren<{
  title: string
  desc?: string
}>

export const InputBox = (props: InputBoxProps) => {
  const { children, title, desc } = props

  return (
    <div className="grid grid-cols-5 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      <div className="col-span-2 w-[85px]">{children}</div>
      <div className="primary-body3 col-span-2 text-functional-text-light">
        {desc}
      </div>
    </div>
  )
}
