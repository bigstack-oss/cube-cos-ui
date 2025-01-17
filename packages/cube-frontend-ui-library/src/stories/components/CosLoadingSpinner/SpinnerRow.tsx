import { PropsWithChildren } from 'react'

export type SpinnerRowProps = PropsWithChildren<{
  title: string
}>

export const SpinnerRow = (props: SpinnerRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center">
      <div className="primary-body2 w-20">{title}</div>
      {children}
    </div>
  )
}
