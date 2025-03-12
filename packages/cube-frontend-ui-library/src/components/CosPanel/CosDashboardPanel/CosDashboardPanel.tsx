import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import {
  CosDashboardPanelHeader,
  CosDashboardPanelHeaderProps,
} from './CosDashboardPanelHeader'
import { CosDashboardPanelContentBox } from './CosDashboardPanelContentBox'
import { CosDashboardPanelContentCol } from './CosDashboardPanelContentCol'
import { CosDashboardPanelContentRow } from './CosDashboardPanelContentRow'
import { CosDashboardPanelContentItem } from './CosDashboardPanelContentItem'

export type CosDashboardPanelProps = PropsWithChildren &
  PropsWithClassName &
  CosDashboardPanelHeaderProps & {
    /**
     * @default true
     */
    useContentWrapper?: boolean
  }

export const CosDashboardPanel = (props: CosDashboardPanelProps) => {
  const {
    className: classNameProp,
    useContentWrapper = true,
    children,
    ...headerProps
  } = props

  const className = twMerge(
    'flex w-full flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4',
    classNameProp,
  )

  return (
    <div
      className={className}
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <CosDashboardPanelHeader {...headerProps} />
      {useContentWrapper ? (
        <CosDashboardPanelContentBox>{children}</CosDashboardPanelContentBox>
      ) : (
        children
      )}
    </div>
  )
}

CosDashboardPanel.Col = CosDashboardPanelContentCol
CosDashboardPanel.Row = CosDashboardPanelContentRow
CosDashboardPanel.Item = CosDashboardPanelContentItem
