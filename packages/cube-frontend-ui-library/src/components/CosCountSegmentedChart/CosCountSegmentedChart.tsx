import { CosSegmentedBar } from '../CosSegmentedBar/CosSegmentedBar'
import { useMemo } from 'react'
import { Segment } from '../CosSegmentedBar/cosSegmentedBarUtils'
import { CosCountSegmentedChartCountInfo, mapToSegment } from './utils'
import { CountInfo } from './CountInfo'

export type CosCountSegmentedChartOverview = Pick<
  CosCountSegmentedChartCountInfo,
  'name' | 'count'
>

export type CosCountSegmentedChartProps = {
  overview?: CosCountSegmentedChartOverview
  countInfos: CosCountSegmentedChartCountInfo[]
}

export const CosCountSegmentedChart = (props: CosCountSegmentedChartProps) => {
  const { overview, countInfos } = props

  const segments = useMemo<Segment[]>(
    () => countInfos.map(mapToSegment),
    [countInfos],
  )

  return (
    <div className="flex flex-col gap-y-3">
      <CosSegmentedBar
        rounded
        /**
         * TODO: This is a workaround. If the first or last segment has a count of 0,
         * the SegmentedBar component will not be rounded.
         * Therefore, we first filter out the segments with a count of 0.
         * */
        segments={segments.filter((s) => s.colCount > 0)}
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
