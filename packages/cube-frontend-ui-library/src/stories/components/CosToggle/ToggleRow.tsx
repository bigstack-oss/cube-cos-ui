import { ReactNode } from 'react'

export type ToggleRowProps = {
  children: ReactNode
  title: string
}

export const ToggleRow = (props: ToggleRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-6 justify-items-center gap-3">
      <h3 className="secondary-h3 justify-self-start">{title}</h3>
      {children}
    </div>
  )
}
