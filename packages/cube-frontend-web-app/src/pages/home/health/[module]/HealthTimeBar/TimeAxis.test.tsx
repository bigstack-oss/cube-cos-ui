// @vitest-environment jsdom
import { DataCenter } from '@cube-frontend/api'
import { cleanup, render } from '@testing-library/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { afterEach, describe, expect, it } from 'vitest'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { TimeAxis } from './TimeAxis'

dayjs.extend(utc)

const WIDTH = 1000

const renderAxis = (utcTimeZone: string, range: DateTimeRange) => {
  const dataCenter = { name: 'node1', utcTimeZone } as DataCenter
  return render(
    <DataCenterContext.Provider
      value={{ dataCenter, fetchDataCenters: undefined, isLoading: false }}
    >
      <svg>
        <TimeAxis dateTimeRange={range} xRange={[0, WIDTH]} />
      </svg>
    </DataCenterContext.Provider>,
  )
}

// Each tick's label must be the instant at its x position, written in the data
// center's offset. Run under a non-UTC `TZ` (for example `TZ=Asia/Taipei`): the
// labels used to be in the browser's zone.
describe('TimeAxis', () => {
  afterEach(cleanup)

  it.each(['+00:00', '+09:00', '-05:00'])(
    'labels "Last 24 hours" ticks in the data center offset %s',
    (utcTimeZone) => {
      const end = dayjs.utc('2026-10-11T12:43:00Z').utcOffset(utcTimeZone)
      const start = end.subtract(24, 'hours')
      const { container } = renderAxis(utcTimeZone, [start, end])

      const ticks = container.querySelectorAll('g[transform^="translate("]')
      expect(ticks.length).toBeGreaterThan(1)

      ticks.forEach((tick) => {
        const x = Number(
          /translate\(([-\d.]+),/.exec(tick.getAttribute('transform')!)![1],
        )
        const at = dayjs(
          start.valueOf() + ((end.valueOf() - start.valueOf()) * x) / WIDTH,
        ).utcOffset(utcTimeZone)
        const [date, time] = [...tick.querySelectorAll('text')].map(
          (text) => text.textContent,
        )
        expect(`${date} ${time}`).toBe(at.format('MM/DD HH:mm'))
      })
    },
  )
})
