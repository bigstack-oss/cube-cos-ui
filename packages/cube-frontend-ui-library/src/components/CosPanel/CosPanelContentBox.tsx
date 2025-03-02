import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosPanelContentCol } from './CosPanelContentCol'
import { basePanelBorderStyle } from './utils'

export const CosPanelContentBox = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div
      className={twMerge(
        'rounded-[5px] border border-functional-border-divider',
        basePanelBorderStyle,
      )}
    >
      <CosPanelContentCol>{children}</CosPanelContentCol>
    </div>
  )
}
