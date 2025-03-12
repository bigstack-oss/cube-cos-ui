import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosDashboardPanelContentCol } from './CosDashboardPanelContentCol'
import { baseDashboardPanelBorderStyle } from './utils'

export const CosDashboardPanelContentBox = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div
      className={twMerge(
        'rounded-[5px] border border-functional-border-divider',
        baseDashboardPanelBorderStyle,
      )}
    >
      <CosDashboardPanelContentCol>{children}</CosDashboardPanelContentCol>
    </div>
  )
}
