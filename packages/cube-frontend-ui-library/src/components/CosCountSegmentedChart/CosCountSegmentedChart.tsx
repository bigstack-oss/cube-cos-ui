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
      <CosSegmentedBar rounded segments={segments} />
      <div className="flex flex-row items-center justify-between">
        {overview && <CountInfo {...overview}></CountInfo>}
        {countInfos.map((segment) => (
          <CountInfo key={segment.name} {...segment} />
        ))}
      </div>
    </div>
  )
}
