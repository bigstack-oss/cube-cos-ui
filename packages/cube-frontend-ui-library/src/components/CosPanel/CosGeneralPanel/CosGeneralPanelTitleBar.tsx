import React from 'react'
import { CosSkeleton } from '../../CosSkeleton/CosSkeleton'

export type CosGeneralPanelTitleBarProps = {
  title?: string
  time?: string
  /**
   * @default false
   */
  isTimeLoading?: boolean
  dropdown?: React.ReactNode
}

export const CosGeneralPanelTitleBar = (
  props: CosGeneralPanelTitleBarProps,
) => {
  const { title, time, isTimeLoading = false, dropdown } = props

  const renderTime = () => {
    if (isTimeLoading) return <CosSkeleton className="h-[13px] w-[97px]" />
    if (!time) return null

    return (
      <span className="secondary-body5 text-functional-text-light">{time}</span>
    )
  }

  return (
    <div className="mb-3 flex items-end justify-between">
      <span className="secondary-body1 text-functional-text-light">
        {title}
      </span>
      <div className="flex items-end gap-x-2">
        {renderTime()}
        {dropdown}
      </div>
    </div>
  )
}
