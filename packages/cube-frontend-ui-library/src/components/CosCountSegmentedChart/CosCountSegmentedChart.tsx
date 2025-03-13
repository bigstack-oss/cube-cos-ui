import { useMemo } from 'react'
import { twJoin } from 'tailwind-merge'
import { range } from 'lodash'
import { CosSegmentedBar } from '../CosSegmentedBar/CosSegmentedBar'
import { Segment } from '../CosSegmentedBar/cosSegmentedBarUtils'
import { CosSegmentedBarSkeleton } from '../CosSegmentedBar/CosSegmentedBarSkeleton'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosCountSegmentedChartCountInfo, mapToSegment } from './utils'
import { CountInfo } from './CountInfo'

const containerClass = twJoin('flex flex-col gap-y-3')

export type CosCountSegmentedChartOverview = Pick<
  CosCountSegmentedChartCountInfo,
  'name' | 'count'
>

export type CosCountSegmentedChartProps = {
  title?: string
  subtext?: string
  overview?: CosCountSegmentedChartOverview
  countInfos: CosCountSegmentedChartCountInfo[]
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * @default 5
   */
  skeletonCount?: number
}

export const CosCountSegmentedChart = (props: CosCountSegmentedChartProps) => {
  const {
    title,
    subtext,
    overview,
    countInfos,
    isLoading,
    skeletonCount = 5,
  } = props

  const segments = useMemo<Segment[]>(
    () => countInfos.map(mapToSegment),
    [countInfos],
  )

  const renderSubtext = () => {
    if (subtext === undefined) return null
    if (isLoading) return <CosSkeleton className="h-[18px] w-[48px]" />

    return <span className="primary-body3 text-functional-text">{subtext}</span>
  }

  const renderHeader = () => {
    if (!title && !subtext) return null
    return (
      <div className="flex items-center gap-x-3">
        <span className="primary-body2 font-medium text-functional-title">
          {title}
        </span>
        {renderSubtext()}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={containerClass}>
        <div className="flex flex-col gap-y-2">
          {renderHeader()}
          <CosSegmentedBarSkeleton />
        </div>
        <div className="flex flex-row items-center justify-between gap-x-[60px]">
          {range(skeletonCount).map((index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-y-2"
            >
              <CosSkeleton className="h-[15px] w-full" />
              <CosSkeleton className="h-[22px] w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-y-2">
        {renderHeader()}
        <CosSegmentedBar rounded segments={segments} />
      </div>
      <div className="flex flex-row items-center justify-between gap-x-2">
        {overview && <CountInfo {...overview}></CountInfo>}
        {countInfos.map((segment) => (
          <CountInfo key={segment.name} {...segment} />
        ))}
      </div>
    </div>
  )
}
