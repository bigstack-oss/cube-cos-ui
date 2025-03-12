import { PropsWithChildren } from 'react'

type PanelBlockProps = PropsWithChildren & {
  title: string
}

export const PanelBlock = (props: PanelBlockProps) => {
  const { title, children } = props
  return (
    <div className="flex flex-col gap-y-3">
      <span className="primary-body2 font-bold">{title}</span>
      <div>{children}</div>
    </div>
  )
}
