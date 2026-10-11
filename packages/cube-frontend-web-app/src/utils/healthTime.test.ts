import { respectTz } from '@cube-frontend/utils'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { formatHealthDetailTime, formatHealthHistoryTimestamp } from './date'

dayjs.extend(respectTz)

// Run under a non-UTC `TZ` (for example `TZ=Asia/Taipei`): these used to be
// rendered in the browser's zone.
describe('health history times', () => {
  it.each([
    ['2026-10-09T11:39:05Z', '2026/10/09 11:39:05'],
    ['2026-10-09T20:39:05+09:00', '2026/10/09 20:39:05'],
  ])('formats the history timestamp %s in its own offset', (time, want) => {
    expect(formatHealthHistoryTimestamp(time)).toBe(want)
  })

  it.each([
    ['2026-10-09T20:46:56Z', '2026/10/09 08:46:56 PM'],
    ['2026-10-10T05:46:56+09:00', '2026/10/10 05:46:56 AM'],
  ])('formats the detail time %s in its own offset', (time, want) => {
    expect(formatHealthDetailTime(time)).toBe(want)
  })
})
