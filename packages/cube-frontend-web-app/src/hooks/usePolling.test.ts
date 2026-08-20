// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePolling } from './usePolling'

const setTabVisibility = (state: 'visible' | 'hidden') => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
  document.dispatchEvent(new Event('visibilitychange'))
}

const advance = (ms: number) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms)
  })

describe('usePolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setTabVisibility('visible')
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('keeps polling while the tab stays visible', async () => {
    const fetch = vi.fn().mockResolvedValue(undefined)

    renderHook(() => usePolling(fetch, 1000, { pauseWhenHidden: true }))

    // usePolling defaults to `immediate: false`, so the first poll lands one
    // interval in, not on mount.
    await advance(1000)
    expect(fetch).toHaveBeenCalledTimes(1)

    await advance(3000)
    expect(fetch.mock.calls.length).toBeGreaterThan(1)
  })

  it('stops polling while the tab is hidden', async () => {
    const fetch = vi.fn().mockResolvedValue(undefined)

    renderHook(() => usePolling(fetch, 1000, { pauseWhenHidden: true }))

    await advance(1000)
    const callsBeforeHiding = fetch.mock.calls.length
    expect(callsBeforeHiding).toBe(1)

    act(() => setTabVisibility('hidden'))
    await advance(10_000)

    expect(fetch).toHaveBeenCalledTimes(callsBeforeHiding)
  })

  it('polls once as soon as the tab becomes visible again', async () => {
    const fetch = vi.fn().mockResolvedValue(undefined)

    renderHook(() => usePolling(fetch, 1000, { pauseWhenHidden: true }))

    await advance(1000)
    act(() => setTabVisibility('hidden'))
    await advance(10_000)
    const callsWhileHidden = fetch.mock.calls.length

    act(() => setTabVisibility('visible'))
    await advance(0)

    expect(fetch).toHaveBeenCalledTimes(callsWhileHidden + 1)
  })

  it('does not resume polling when a request in flight resolves after the tab hid', async () => {
    let resolveFetch: () => void = () => {}
    const fetch = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveFetch = resolve
        }),
    )

    renderHook(() => usePolling(fetch, 1000, { pauseWhenHidden: true }))

    // Put one request in flight, then hide the tab before it settles.
    await advance(1000)
    expect(fetch).toHaveBeenCalledTimes(1)

    act(() => setTabVisibility('hidden'))
    await act(async () => {
      resolveFetch()
    })
    await advance(10_000)

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('ignores tab visibility when pauseWhenHidden is not set', async () => {
    const fetch = vi.fn().mockResolvedValue(undefined)

    renderHook(() => usePolling(fetch, 1000))

    await advance(1000)
    const callsBeforeHiding = fetch.mock.calls.length

    act(() => setTabVisibility('hidden'))
    await advance(3000)

    expect(fetch.mock.calls.length).toBeGreaterThan(callsBeforeHiding)
  })

  it('stops polling on unmount', async () => {
    const fetch = vi.fn().mockResolvedValue(undefined)

    const { unmount } = renderHook(() =>
      usePolling(fetch, 1000, { pauseWhenHidden: true }),
    )

    await advance(1000)
    unmount()
    const callsAtUnmount = fetch.mock.calls.length

    await advance(10_000)

    expect(fetch).toHaveBeenCalledTimes(callsAtUnmount)
  })
})
