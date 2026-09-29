import { describe, expect, test } from 'vitest'
import { GPUCardStatus, GPUResourceType } from '@cube-frontend/api'
import {
  getInstanceHistoryLinks,
  getUnmeasurableReasonKey,
  isGpuTypeEditDisabled,
  isGpuUtilizationHistorySupported,
  isGpuVramHistorySupported,
  isInstanceProfileAliasSupported,
  isInstanceVramHistorySupported,
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

describe('isInstanceVramHistorySupported', () => {
  test('returns true for both vGPU types, whose instances report mem_*', () => {
    expect(isInstanceVramHistorySupported(GPUResourceType.SriovVgpu)).toBe(true)
    expect(isInstanceVramHistorySupported(GPUResourceType.MigBackedVgpu)).toBe(
      true,
    )
  })

  test('returns false for the types that never carry a charted instance', () => {
    expect(isInstanceVramHistorySupported(GPUResourceType.Pgpu)).toBe(false)
    expect(isInstanceVramHistorySupported(GPUResourceType.Unset)).toBe(false)
  })
})

describe('getInstanceHistoryLinks', () => {
  const links = {
    workloadHistory: 'https://grafana/workload',
    vramHistory: 'https://grafana/vram',
  }
  const noLinks = { workloadHistory: null, vramHistory: null }
  const noLinkKey = 'nodes.details.attachedInstancesList.historyUnavailable'
  const pgpuKey = 'nodes.details.attachedInstancesList.historyUnavailable.pgpu'
  const migEmptyKey = 'nodes.details.attachedInstancesList.workloadHistoryEmpty'

  test('drops both links the API sends for a passthrough instance and blames vfio-pci', () => {
    expect(getInstanceHistoryLinks(GPUResourceType.Pgpu, links)).toEqual({
      workload: { href: null, disabledReasonKey: pgpuKey },
      vram: { href: null, disabledReasonKey: pgpuKey },
    })
  })

  test('blames vfio-pci for a passthrough instance when the API sends no links', () => {
    expect(getInstanceHistoryLinks(GPUResourceType.Pgpu, noLinks)).toEqual({
      workload: { href: null, disabledReasonKey: pgpuKey },
      vram: { href: null, disabledReasonKey: pgpuKey },
    })
  })

  test('keeps both links for an SR-IOV vGPU instance', () => {
    const result = getInstanceHistoryLinks(GPUResourceType.SriovVgpu, links)

    expect(result.workload.href).toBe(links.workloadHistory)
    expect(result.vram.href).toBe(links.vramHistory)
  })

  test('keeps only the VRAM link for a MIG-backed instance and names MIG as the reason', () => {
    expect(
      getInstanceHistoryLinks(GPUResourceType.MigBackedVgpu, links),
    ).toEqual({
      workload: { href: null, disabledReasonKey: migEmptyKey },
      vram: { href: links.vramHistory, disabledReasonKey: noLinkKey },
    })
  })

  test('names MIG for a MIG-backed workload link even when the API sends no links', () => {
    expect(
      getInstanceHistoryLinks(GPUResourceType.MigBackedVgpu, noLinks),
    ).toEqual({
      workload: { href: null, disabledReasonKey: migEmptyKey },
      vram: { href: null, disabledReasonKey: noLinkKey },
    })
  })

  test('says the OpenStack lookup failed for an SR-IOV instance without links', () => {
    expect(getInstanceHistoryLinks(GPUResourceType.SriovVgpu, noLinks)).toEqual(
      {
        workload: { href: null, disabledReasonKey: noLinkKey },
        vram: { href: null, disabledReasonKey: noLinkKey },
      },
    )
  })
})

describe('isInstanceProfileAliasSupported', () => {
  test('returns false for passthrough GPU, whose instance takes the whole card', () => {
    expect(isInstanceProfileAliasSupported(GPUResourceType.Pgpu)).toBe(false)
  })

  test('returns true for both vGPU types, whose instances use a profile', () => {
    expect(isInstanceProfileAliasSupported(GPUResourceType.SriovVgpu)).toBe(
      true,
    )
    expect(isInstanceProfileAliasSupported(GPUResourceType.MigBackedVgpu)).toBe(
      true,
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
