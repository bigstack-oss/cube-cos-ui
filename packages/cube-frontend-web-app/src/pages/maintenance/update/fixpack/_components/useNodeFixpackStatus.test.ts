import { describe, expect, it } from 'vitest'
import { getPartiallyInstalledVersions } from './useNodeFixpackStatus'

describe('getPartiallyInstalledVersions', () => {
  it('lists versions some reachable nodes miss', () => {
    const versions = getPartiallyInstalledVersions([
      { name: 'n1', installed: ['v1', 'v2'], status: 'ok' },
      { name: 'n2', installed: ['v1'], status: 'missing v2' },
      { name: 'n3', installed: [], status: 'unreachable' },
    ])
    expect([...versions]).toEqual(['v2'])
  })

  it('is empty when every reachable node has the same fixpacks', () => {
    const versions = getPartiallyInstalledVersions([
      { name: 'n1', installed: ['v1'], status: 'ok' },
      { name: 'n2', installed: ['v1'], status: 'ok' },
    ])
    expect(versions.size).toBe(0)
  })
})
