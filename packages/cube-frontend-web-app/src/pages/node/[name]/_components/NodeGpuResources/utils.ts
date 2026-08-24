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

/**
 * The instance Workload panel plots `util_gpu` from the `gpu.vm` measurement. A
 * MIG-backed vGPU reports no utilization at all — the field is absent, which is
 * why an instance on such a card already shows a dash instead of a number — so
 * its workload chart opens empty. Only an SR-IOV vGPU draws the line. A
 * passthrough card never reaches this check: the API sends no link for it.
 */
export const isInstanceWorkloadHistorySupported = (
  resourceType: GPUResourceType,
): boolean => resourceType === GPUResourceType.SriovVgpu

/**
 * The API reports `null` for a number the host cannot read, and it applies no
 * per-resource-type rule while doing so — a nil source simply stays nil. Only two
 * hardware configurations produce one, so the card's type explains the gap, and
 * the reason stops being reachable on its own once DCGM supplies the numbers.
 */
export const getUnmeasurableReasonKey = (
  resourceType: GPUResourceType,
): ParseKeys => {
  if (resourceType === GPUResourceType.Pgpu) {
    return 'nodes.details.gpuList.unmeasurable.pgpu'
  }

  if (resourceType === GPUResourceType.MigBackedVgpu) {
    return 'nodes.details.gpuList.unmeasurable.migBackedVgpu'
  }

  return 'nodes.details.gpuList.unmeasurable.generic'
}

export const GpuTypeLabelKeyMap: Record<GPUResourceType, ParseKeys> = {
  [GPUResourceType.Unset]: 'nodes.details.gpuList.resourceType.unset',
  [GPUResourceType.Pgpu]: 'nodes.details.gpuList.resourceType.pgpu',
  [GPUResourceType.SriovVgpu]: 'nodes.details.gpuList.resourceType.sriovVgpu',
  [GPUResourceType.MigBackedVgpu]:
    'nodes.details.gpuList.resourceType.migBackedVgpu',
}
