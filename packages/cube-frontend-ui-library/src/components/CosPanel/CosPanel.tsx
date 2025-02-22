import { PropsWithChildren } from 'react'
import { CosPanelHeader, CosPanelHeaderProps } from './CosPanelHeader'
import { CosPanelContentCol } from './CosPanelContentCol'
import { CosPanelContentItem } from './CosPanelContentItem'
import { CosPanelContentRow } from './CosPanelContentRow'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'
import { basePanelBorderStyle } from './utils'

export type CosPanelProps = PropsWithChildren &
  PropsWithClassName &
  CosPanelHeaderProps

export const CosPanel = (props: CosPanelProps) => {
  const { className: classNameProp, children, ...restProps } = props

  const className = twMerge(
    'flex w-full flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4',
    classNameProp,
  )

  return (
    <div
      className={className}
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <CosPanelHeader {...restProps} />
      <div
        className={twMerge(
          'rounded-[5px] border border-functional-border-divider',
          basePanelBorderStyle,
        )}
      >
        <CosPanelContentCol>{children}</CosPanelContentCol>
      </div>
    </div>
  )
}

CosPanel.Item = CosPanelContentItem
CosPanel.Col = CosPanelContentCol
CosPanel.Row = CosPanelContentRow
