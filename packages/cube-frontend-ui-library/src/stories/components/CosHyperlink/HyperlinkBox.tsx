import { PropsWithChildren } from 'react'

export type HyperlinkBoxProps = PropsWithChildren<{
  title: string
}>

export const HyperlinkBox = (props: HyperlinkBoxProps) => {
  const { children, title } = props
  return (
    <div className="grid grid-cols-5 items-center gap-12">
      <div className="primary-body2 col-span-1 font-medium">{title}</div>
      {children}
    </div>
  )
}
