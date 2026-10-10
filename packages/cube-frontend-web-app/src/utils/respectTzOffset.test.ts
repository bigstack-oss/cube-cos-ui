import { respectTz } from '@cube-frontend/utils'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

dayjs.extend(respectTz)

// Run under a non-UTC `TZ` (for example `TZ=Asia/Taipei`): on a UTC runner the
// browser zone and offset 0 coincide, so the `HH:mm` case cannot fail there.
describe('dayjs.respectTzOffset', () => {
  it.each([
    ['2026-10-09T04:12:43Z', '2026-10-09T04:12:43Z'],
    ['2026-10-09T04:12:43z', '2026-10-09T04:12:43Z'],
    ['2026-10-09T08:00:00.123Z', '2026-10-09T08:00:00Z'],
    ['2026-10-09T04:12:43+00:00', '2026-10-09T04:12:43Z'],
    ['2026-10-09T12:12:43+08:00', '2026-10-09T12:12:43+08:00'],
    ['2026-10-09T13:12:43+09:00', '2026-10-09T13:12:43+09:00'],
    ['2026-10-08T23:12:43-05:00', '2026-10-08T23:12:43-05:00'],
  ])('keeps the wall clock and offset of %s', (date, want) => {
    expect(dayjs.respectTzOffset(date).format()).toEqual(want)
  })

  it('shows a Z time in UTC, not in the browser timezone', () => {
    expect(dayjs.respectTzOffset('2026-10-09T04:12:43Z').format('HH:mm')).toBe(
      '04:12',
    )
  })

  it('keeps the instant of a Z time', () => {
    expect(dayjs.respectTzOffset('2026-10-09T04:12:43Z').valueOf()).toBe(
      Date.UTC(2026, 9, 9, 4, 12, 43),
    )
  })

  it('treats the same instant written with different offsets as equal', () => {
    const z = dayjs.respectTzOffset('2026-10-09T09:04:31Z')
    const tokyo = dayjs.respectTzOffset('2026-10-09T18:04:31+09:00')
    expect(z.isSame(tokyo)).toBe(true)
  })
})
