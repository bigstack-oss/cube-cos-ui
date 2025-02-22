import { FillColorClass } from '@cube-frontend/ui-theme'
import { Segment } from '../CosSegmentedBar/cosSegmentedBarUtils'

export type CosCountSegmentedChartCountInfo = {
  name: string
  count: number
  color: FillColorClass
}

export const mapToSegment = (
  countInfo: CosCountSegmentedChartCountInfo,
): Segment => {
  return {
    colCount: countInfo.count,
    color: countInfo.color,
  }
}
