import { useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { scaleTime } from 'd3'
import { cubeTheme } from '@cube-frontend/ui-theme'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'

const PIXEL_PER_TICK = 100
const SHOW_SECONDS_THRESHOLD_MINUTES = 5

const TICK_HEIGHT = 4
const FONT_SIZE = 10
const FONT_STYLE: React.CSSProperties = {
  fill: cubeTheme.colors.functional['text'],
  fontSize: `${FONT_SIZE}px`,
  textAnchor: 'middle',
}

export const TIME_AXIS_HEIGHT = 32

export type TimeAxisProps = {
  dateTimeRange: DateTimeRange
  xRange: [number, number]
}

const formatDate = (dateTime: Dayjs) => dateTime.format('MM/DD')

const formatTime = (dateTime: Dayjs, dateTimeRange: DateTimeRange) => {
  const [start, end] = dateTimeRange
  const duration = end.diff(dayjs(start), 'minutes')

  return duration < SHOW_SECONDS_THRESHOLD_MINUTES
    ? dateTime.format('HH:mm:ss')
    : dateTime.format('HH:mm')
}

export const TimeAxis = (props: TimeAxisProps) => {
  const { dateTimeRange, xRange } = props

  const ticks = useMemo(() => {
    const xScale = scaleTime().domain(dateTimeRange).range(xRange)
    const width = xRange[1] - xRange[0]
    const numberOfTicksTarget = Math.max(1, Math.floor(width / PIXEL_PER_TICK))

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value: dayjs(value),
      xOffset: xScale(value),
    }))
  }, [dateTimeRange, xRange])

  const drawPathCommands = [
    ['M', xRange[0], TICK_HEIGHT], // start point
    ['v', -TICK_HEIGHT], // left tick
    ['H', xRange[1]], // horizontal line
    ['v', TICK_HEIGHT], // right tick
  ]
    .flat()
    .join(' ')

  return (
    <g>
      <path
        d={drawPathCommands}
        fill="none"
        stroke={cubeTheme.colors.functional['border-divider']}
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value.toString()} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_HEIGHT} stroke={cubeTheme.colors.functional['text']} />
          <text style={{ ...FONT_STYLE, transform: 'translateY(15px)' }}>
            {formatDate(value)}
          </text>
          <text style={{ ...FONT_STYLE, transform: 'translateY(27px)' }}>
            {formatTime(value, dateTimeRange)}
          </text>
        </g>
      ))}
    </g>
  )
}
