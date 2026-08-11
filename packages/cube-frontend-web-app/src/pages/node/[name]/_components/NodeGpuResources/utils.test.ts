import { describe, expect, test } from 'vitest'
import { GPUResourceType } from '@cube-frontend/api'
import { isProfileRemainingSupported } from './utils'

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
