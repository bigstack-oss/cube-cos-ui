import {
  CosHyperlink,
  CosSegmentedBar,
  Segment,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { RouterLink } from '@cube-frontend/web-app/components/RouterLink/RouterLink'
import { Dayjs } from 'dayjs'
import { capitalize } from 'lodash'
import { useMemo } from 'react'
import { computeHealthSegments } from './computeHealthSegments'
import { createTimePointFns, TimePoint } from './createTimePointFns'
import { TimeRange } from './healthAccordionUtils'
import { HealthTimeTrack, timeTrackHeight } from './HealthTimeTrack'
import { ModuleHealthHistory } from './mockHealth'

export type ModuleHealthProps = {
  name: string
  history: ModuleHealthHistory
  timeRange: TimeRange
  now: Dayjs
}

export const ModuleHealth = (props: ModuleHealthProps) => {
  const { name, history, timeRange, now } = props

  const detailPageLink = useMemo<string>(() => `/home/health/${name}`, [name])

  const timePoints = useMemo<TimePoint[]>(
    () => createTimePointFns[timeRange](now),
    [timeRange, now],
  )

  const healthSegments = useMemo<Segment[]>(
    () => computeHealthSegments(history, timePoints),
    [history, timePoints],
  )

  return (
    <div className="border-t border-t-functional-border-divider px-12 py-7 pb-3">
      <RouterLink href={detailPageLink}>
        <CosHyperlink
          className="text-functional-text"
          variant="icon-right"
          Icon={ChevronRight}
        >
          {capitalize(name)}
        </CosHyperlink>
      </RouterLink>
      <CosSegmentedBar
        className="mt-4"
        segments={healthSegments}
        childrenDimensions={{
          height: timeTrackHeight,
          marginTop: 4,
        }}
      >
        {(barWidth) => (
          <HealthTimeTrack width={barWidth} timePoints={timePoints} />
        )}
      </CosSegmentedBar>
    </div>
  )
}
