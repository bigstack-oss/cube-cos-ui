import { describe, expect, test } from 'vitest'
import { GPUCardStatus, GPUResourceType } from '@cube-frontend/api'
import {
  getUnmeasurableReasonKey,
  isGpuTypeEditDisabled,
  isGpuUtilizationHistorySupported,
  isGpuVramHistorySupported,
  isInstanceWorkloadHistorySupported,
  isProfileRemainingSupported,
} from './utils'

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

describe('isGpuUtilizationHistorySupported', () => {
  test('returns true for the resource types the host still reads util_* from', () => {
    expect(isGpuUtilizationHistorySupported(GPUResourceType.Unset)).toBe(true)
    expect(isGpuUtilizationHistorySupported(GPUResourceType.SriovVgpu)).toBe(
      true,
    )
  })

  test('returns false for MIG-backed vGPU, which reports no device-level utilization', () => {
    expect(
      isGpuUtilizationHistorySupported(GPUResourceType.MigBackedVgpu),
    ).toBe(false)
  })

  test('returns false for passthrough GPU, which the host cannot see', () => {
    expect(isGpuUtilizationHistorySupported(GPUResourceType.Pgpu)).toBe(false)
  })
})

describe('isGpuVramHistorySupported', () => {
  test('returns true for every resource type the host still samples memory of', () => {
    expect(isGpuVramHistorySupported(GPUResourceType.Unset)).toBe(true)
    expect(isGpuVramHistorySupported(GPUResourceType.SriovVgpu)).toBe(true)
    expect(isGpuVramHistorySupported(GPUResourceType.MigBackedVgpu)).toBe(true)
  })

  test('returns false for passthrough GPU, which the host cannot see', () => {
    expect(isGpuVramHistorySupported(GPUResourceType.Pgpu)).toBe(false)
  })
})

describe('isInstanceWorkloadHistorySupported', () => {
  test('returns true for SR-IOV vGPU, the only type whose instance reports util_gpu', () => {
    expect(isInstanceWorkloadHistorySupported(GPUResourceType.SriovVgpu)).toBe(
      true,
    )
  })

  test('returns false for MIG-backed vGPU, whose instance reports no utilization', () => {
    expect(
      isInstanceWorkloadHistorySupported(GPUResourceType.MigBackedVgpu),
    ).toBe(false)
  })

  test('returns false for the types that never carry a charted instance', () => {
    expect(isInstanceWorkloadHistorySupported(GPUResourceType.Pgpu)).toBe(false)
    expect(isInstanceWorkloadHistorySupported(GPUResourceType.Unset)).toBe(
      false,
    )
  })
})

describe('getUnmeasurableReasonKey', () => {
  test('blames vfio-pci for a passthrough card', () => {
    expect(getUnmeasurableReasonKey(GPUResourceType.Pgpu)).toBe(
      'nodes.details.gpuList.unmeasurable.pgpu',
    )
  })

  test('blames MIG mode for a MIG-backed card', () => {
    expect(getUnmeasurableReasonKey(GPUResourceType.MigBackedVgpu)).toBe(
      'nodes.details.gpuList.unmeasurable.migBackedVgpu',
    )
  })

  test('falls back to the generic reason for a type that should report a value', () => {
    expect(getUnmeasurableReasonKey(GPUResourceType.Unset)).toBe(
      'nodes.details.gpuList.unmeasurable.generic',
    )
    expect(getUnmeasurableReasonKey(GPUResourceType.SriovVgpu)).toBe(
      'nodes.details.gpuList.unmeasurable.generic',
    )
  })
})
