import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import {
  BrushFilter,
  DateTimeRange,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import { HealthSegmentedBar } from '@cube-frontend/web-app/components/HealthSegmentedBar/HealthSegmentedBar'
import { TIME_AXIS_HEIGHT, TimeAxis } from './TimeAxis'
import { HealthIndicators } from './NgIndicators'
import { cubeTheme } from '@cube-frontend/ui-theme'

export type HealthBrushTimeBarProps = {
  paddingX: number
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined
  dateTimeRange: DateTimeRange
  brushDateTimeRange: DateTimeRange | null
  onBrushDateTimeRangeChange: (range: DateTimeRange | null) => void
}

const INDICATOR_SIZE = 7
const BAR_PADDING_Y = 20

export const HealthBrushTimeBar = (props: HealthBrushTimeBarProps) => {
  const {
    paddingX,
    history,
    dateTimeRange,
    brushDateTimeRange,
    onBrushDateTimeRangeChange,
  } = props

  return (
    <HealthSegmentedBar
      history={history ?? []}
      dateTimeRange={dateTimeRange}
      paddingX={paddingX}
      barMarginTop={BAR_PADDING_Y}
      childrenDimensions={{
        height: TIME_AXIS_HEIGHT,
        marginTop: BAR_PADDING_Y,
      }}
      overlay={(width, height, segments) => (
        <>
          <line
            x1={0}
            x2={width}
            strokeWidth={2}
            stroke={cubeTheme.colors.functional['border-divider']}
          />
          <g transform={`translate(0, ${BAR_PADDING_Y - INDICATOR_SIZE} )`}>
            <HealthIndicators
              segments={segments}
              dateTimeRange={dateTimeRange}
              xRange={[0, width]}
              size={INDICATOR_SIZE}
            />
          </g>
          <BrushFilter
            width={width}
            height={height - TIME_AXIS_HEIGHT}
            dateTimeRange={dateTimeRange}
            selectedDateTimeRange={brushDateTimeRange}
            onSelectedDateTimeRangeChange={onBrushDateTimeRangeChange}
          />
        </>
      )}
    >
      {(width) => (
        <TimeAxis dateTimeRange={dateTimeRange} xRange={[0, width]} />
      )}
    </HealthSegmentedBar>
  )
}
