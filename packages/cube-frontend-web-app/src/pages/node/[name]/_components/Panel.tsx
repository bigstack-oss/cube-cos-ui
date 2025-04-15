import { PropsWithClassName } from '@cube-frontend/utils'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type PanelProps = PropsWithClassName & PropsWithChildren

export const Panel = (props: PanelProps) => {
  const { className, children } = props

  return (
    <div
      className={twMerge(
        'flex flex-col rounded-[5px] bg-grey-0 px-6 py-4',
        className,
      )}
      style={{
        boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      {children}
    </div>
  )
}
