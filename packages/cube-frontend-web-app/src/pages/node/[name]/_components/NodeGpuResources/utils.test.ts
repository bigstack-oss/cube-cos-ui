import { describe, expect, test } from 'vitest'
import { GPUCardStatus, GPUResourceType } from '@cube-frontend/api'
import { isGpuTypeEditDisabled, isProfileRemainingSupported } from './utils'

describe('isProfileRemainingSupported', () => {
  test('returns true for MIG-backed vGPU, which limits instances per profile', () => {
    expect(isProfileRemainingSupported(GPUResourceType.MigBackedVgpu)).toBe(
      true,
    )
  })

  test('returns false for SR-IOV vGPU, which has no instance count limit', () => {
    expect(isProfileRemainingSupported(GPUResourceType.SriovVgpu)).toBe(false)
  })

  test('returns false for resource types without profiles', () => {
    expect(isProfileRemainingSupported(GPUResourceType.Pgpu)).toBe(false)
    expect(isProfileRemainingSupported(GPUResourceType.Unset)).toBe(false)
  })
})

describe('isGpuTypeEditDisabled', () => {
  test('blocks a card a VM already holds', () => {
    expect(
      isGpuTypeEditDisabled({
        current: GPUCardStatus.InUse,
        isProcessing: false,
      }),
    ).toBe(true)
  })

  test('blocks a card whose previous change has not settled', () => {
    expect(
      isGpuTypeEditDisabled({
        current: GPUCardStatus.Idle,
        isProcessing: true,
      }),
    ).toBe(true)
    expect(
      isGpuTypeEditDisabled({
        current: GPUCardStatus.Unassigned,
        isProcessing: true,
      }),
    ).toBe(true)
  })

  test('allows an idle or unassigned card that is not changing', () => {
    expect(
      isGpuTypeEditDisabled({
        current: GPUCardStatus.Idle,
        isProcessing: false,
      }),
    ).toBe(false)
    expect(
      isGpuTypeEditDisabled({
        current: GPUCardStatus.Unassigned,
        isProcessing: false,
      }),
    ).toBe(false)
  })
})
