import { describe, expect, test } from 'vitest'
import {
  GPUProfile,
  ListNodeGPUCardsResponseDataInner,
} from '@cube-frontend/api'
import {
  getMigBackedCapacityMiB,
  getProfileLimits,
} from './editGPUResourceUtils'

const profile = (
  id: number,
  vramMiB: number,
  countLimit: number | null,
): GPUProfile =>
  ({
    id,
    name: `profile-${id}`,
    vramMiB,
    count: 0,
    remaining: null,
    aliasName: null,
    countLimit,
  }) as GPUProfile

const card = (
  migBackedVgpu: GPUProfile[] | null,
  totalMiB: number | null,
): ListNodeGPUCardsResponseDataInner =>
  ({
    sriovVgpuProfileCountLimit: 32,
    vram: { allocatedMiB: null, totalMiB, utilizationPercent: null },
    profiles: { sriovVgpu: null, migBackedVgpu },
  }) as unknown as ListNodeGPUCardsResponseDataInner

// An RTX PRO 6000 Blackwell: nvidia-smi measures 97887 MiB (95.59 GiB), while
// every MIG-backed type gives vramMiB * countLimit = 98304 (96 GiB).
const RTX_PRO_6000_MIG = [
  profile(1558, 12288, 8), // DC-1-12Q
  profile(1576, 24576, 4), // DC-4-24Q
  profile(1585, 98304, 1), // DC-4-96Q
]

describe('getMigBackedCapacityMiB', () => {
  test('is the nominal capacity, not the measured total (#1794)', () => {
    expect(getMigBackedCapacityMiB(card(RTX_PRO_6000_MIG, 97887))).toBe(98304)
  })

  test('the full-size profile at count 1 fits', () => {
    const limits = getProfileLimits(card(RTX_PRO_6000_MIG, 97887))
    expect(98304 <= limits.vramMiB).toBe(true)
  })

  test('takes the largest vramMiB * countLimit, not the largest profile', () => {
    expect(
      getMigBackedCapacityMiB(
        card([profile(1, 10240, 8), profile(2, 40960, 1)], 81920),
      ),
    ).toBe(81920)
  })

  test('counts a profile once where countLimit is unknown, as on a pgpu card', () => {
    expect(
      getMigBackedCapacityMiB(
        card([profile(1576, 24576, null), profile(1585, 98304, null)], 97887),
      ),
    ).toBe(98304)
  })

  test('falls back to the measured total without MIG-backed profiles', () => {
    expect(getMigBackedCapacityMiB(card(null, 97887))).toBe(97887)
    expect(getMigBackedCapacityMiB(card([], 97887))).toBe(97887)
    expect(getMigBackedCapacityMiB(card(null, null))).toBe(0)
  })
})
