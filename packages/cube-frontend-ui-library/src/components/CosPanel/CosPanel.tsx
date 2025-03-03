import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosPanelHeader, CosPanelHeaderProps } from './CosPanelHeader'
import { CosPanelContentBox } from './CosPanelContentBox'
import { CosPanelContentCol } from './CosPanelContentCol'
import { CosPanelContentRow } from './CosPanelContentRow'
import { CosPanelContentItem } from './CosPanelContentItem'

export type CosPanelProps = PropsWithChildren &
  PropsWithClassName &
  CosPanelHeaderProps & {
    /**
     * @default true
     */
    useContentWrapper?: boolean
  }

export const CosPanel = (props: CosPanelProps) => {
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
      <CosPanelHeader {...headerProps} />
      {useContentWrapper ? (
        <CosPanelContentBox>{children}</CosPanelContentBox>
      ) : (
        children
      )}
    </div>
  )
}

CosPanel.Col = CosPanelContentCol
CosPanel.Row = CosPanelContentRow
CosPanel.Item = CosPanelContentItem
