import { PropsWithChildren } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

export type CosGeneralPanelContainerProps = PropsWithChildren &
  PropsWithClassName

export const CosGeneralPanelContainer = (
  props: CosGeneralPanelContainerProps,
) => {
  const { className: classNameProps, children } = props
  const className = twMerge(
    'flex flex-col items-stretch gap-y-3',
    classNameProps,
  )

  return <div className={className}>{children}</div>
}
