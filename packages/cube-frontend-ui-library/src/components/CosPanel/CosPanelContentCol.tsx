import { PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

type CosPanelContentColProps = PropsWithChildren & PropsWithClassName

export const CosPanelContentCol = (props: CosPanelContentColProps) => {
  const { className: classNameProp, children } = props

  const className = twMerge(
    'flex flex-1 flex-col border-functional-border-divider [&>*+*]:border-t',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
