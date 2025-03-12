import { PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

type CosDashboardPanelContentRowProps = PropsWithChildren & PropsWithClassName

export const CosDashboardPanelContentRow = (
  props: CosDashboardPanelContentRowProps,
) => {
  const { className: classNameProp, children } = props

  const className = twMerge(
    'flex flex-row border-functional-border-divider [&>*+*]:border-l',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
