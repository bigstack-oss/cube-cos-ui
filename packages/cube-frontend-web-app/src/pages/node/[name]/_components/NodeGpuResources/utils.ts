import {
  GPUCardStatus,
  GPUProfile,
  GPUResourceType,
  ListNodeGPUCardsResponseDataInner,
  ListNodeGPUCardsResponseDataInnerStatus,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { ParseKeys } from 'i18next'

export type GpuResourceRow = ListNodeGPUCardsResponseDataInner & CosTableRow

export type GPUProfileRow = Omit<GPUProfile, 'id'> & CosTableRow

export const normalizeProfiles = (profiles: GPUProfile[]): GPUProfileRow[] => {
  return profiles.map(({ id, ...profile }) => ({
    ...profile,
    id: id.toString(),
  }))
}

export const getProfilesByResourceType = (
  resource: ListNodeGPUCardsResponseDataInner,
): GPUProfileRow[] => {
  if (resource.resourceType === GPUResourceType.SriovVgpu) {
    return normalizeProfiles(resource.profiles.sriovVgpu ?? [])
  }

  if (resource.resourceType === GPUResourceType.MigBackedVgpu) {
    return normalizeProfiles(resource.profiles.migBackedVgpu ?? [])
  }

  return []
}

/**
 * Only MIG-backed vGPU limits how many instances a profile can serve, so only
 * its profiles have a meaningful remaining count.
 */
export const isProfileRemainingSupported = (
  resourceType: GPUResourceType,
): boolean => resourceType === GPUResourceType.MigBackedVgpu

/**
 * Changing a card's resource type re-partitions the device, so it needs the card
 * to be free *and* settled: a VM holding it would lose the device underneath it,
 * and a card whose previous change is still running would take a second one on
 * top of an unfinished state. `isProcessing` is what the row's spinner reads.
 */
export const isGpuTypeEditDisabled = (
  status: ListNodeGPUCardsResponseDataInnerStatus,
): boolean => status.current === GPUCardStatus.InUse || status.isProcessing

/**
 * The Grafana GPU Utilization panel plots `util_gpu` from the `gpu.host`
 * measurement. NVIDIA stops reporting device-level utilization once MIG is
 * enabled, and a passthrough card is bound to vfio-pci and handed to a VM, so
 * neither type ever draws a line.
 */
export const isGpuUtilizationHistorySupported = (
  resourceType: GPUResourceType,
): boolean =>
  resourceType === GPUResourceType.Unset ||
  resourceType === GPUResourceType.SriovVgpu

/**
 * The collector samples `mem_*` at device level, so VRAM survives MIG. Only a
 * passthrough card is invisible to the host.
 */
export const isGpuVramHistorySupported = (
  resourceType: GPUResourceType,
): boolean => resourceType !== GPUResourceType.Pgpu

export const GpuTypeLabelKeyMap: Record<GPUResourceType, ParseKeys> = {
  [GPUResourceType.Unset]: 'nodes.details.gpuList.resourceType.unset',
  [GPUResourceType.Pgpu]: 'nodes.details.gpuList.resourceType.pgpu',
  [GPUResourceType.SriovVgpu]: 'nodes.details.gpuList.resourceType.sriovVgpu',
  [GPUResourceType.MigBackedVgpu]:
    'nodes.details.gpuList.resourceType.migBackedVgpu',
}
