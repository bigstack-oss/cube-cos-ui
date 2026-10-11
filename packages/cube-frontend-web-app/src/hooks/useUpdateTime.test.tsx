// @vitest-environment jsdom
import { DataCenter } from '@cube-frontend/api'
import { cleanup, renderHook } from '@testing-library/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PropsWithChildren } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DataCenterContext } from '../context/DataCenterContext'
import { useUpdateTime } from './useUpdateTime'

dayjs.extend(utc)

const renderInDataCenter = (utcTimeZone: string | undefined) => {
  const dataCenter = utcTimeZone
    ? ({ name: 'node1', utcTimeZone } as DataCenter)
    : undefined
  const wrapper = ({ children }: PropsWithChildren) => (
    <DataCenterContext.Provider
      value={{ dataCenter, fetchDataCenters: undefined, isLoading: false }}
    >
      {children}
    </DataCenterContext.Provider>
  )
  return renderHook(() => useUpdateTime({}, false), { wrapper })
}

// Run under a non-UTC `TZ` (for example `TZ=Asia/Taipei`): the panels used to
// show the browser's wall clock, which a UTC runner cannot tell apart.
describe('useUpdateTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-09T11:39:00Z'))
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it.each([
    ['+00:00', '2026/10/09 11:39'],
    ['+09:00', '2026/10/09 20:39'],
    ['-05:00', '2026/10/09 06:39'],
  ])('shows the data center time at %s', (utcTimeZone, want) => {
    const { result } = renderInDataCenter(utcTimeZone)
    expect(result.current).toBe(want)
  })

  it('returns null while loading', () => {
    const { result } = renderHook(() => useUpdateTime({}, true))
    expect(result.current).toBeNull()
  })
})
