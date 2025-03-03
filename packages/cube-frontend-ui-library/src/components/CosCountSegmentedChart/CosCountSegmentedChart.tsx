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
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * @default 5
   */
  skeletonCount?: number
  overview?: CosCountSegmentedChartOverview
  countInfos: CosCountSegmentedChartCountInfo[]
}

export const CosCountSegmentedChart = (props: CosCountSegmentedChartProps) => {
  const { isLoading, skeletonCount = 5, overview, countInfos } = props

  const segments = useMemo<Segment[]>(
    () => countInfos.map(mapToSegment),
    [countInfos],
  )

  if (isLoading) {
    return (
      <div className={containerClass}>
        <CosSegmentedBarSkeleton />
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
      <CosSegmentedBar
        rounded
        /**
         * TODO: This is a workaround. If the first or last segment has a count of 0,
         * the SegmentedBar component will not be rounded.
         * Therefore, we first filter out the segments with a count of 0.
         * */
        // segments={segments.filter((s) => s.colCount > 0)}
        segments={segments}
      />
      <div className="flex flex-row items-center justify-between gap-x-2">
        {overview && <CountInfo {...overview}></CountInfo>}
        {countInfos.map((segment) => (
          <CountInfo key={segment.name} {...segment} />
        ))}
      </div>
    </div>
  )
}
