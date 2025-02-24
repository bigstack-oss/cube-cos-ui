import { PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

type CosPanelContentRowProps = PropsWithChildren & PropsWithClassName

export const CosPanelContentRow = (props: CosPanelContentRowProps) => {
  const { className: classNameProp, children } = props

  const className = twMerge(
    'flex flex-row border-functional-border-divider [&>*+*]:border-l',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
