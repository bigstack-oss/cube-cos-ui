import {
  GPUProfile,
  GPUResourceType,
  ListNodeGPUCardsResponseDataInner,
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

export const GpuTypeLabelKeyMap: Record<GPUResourceType, ParseKeys> = {
  [GPUResourceType.Unset]: 'nodes.details.gpuList.resourceType.unset',
  [GPUResourceType.Pgpu]: 'nodes.details.gpuList.resourceType.pgpu',
  [GPUResourceType.SriovVgpu]: 'nodes.details.gpuList.resourceType.sriovVgpu',
  [GPUResourceType.MigBackedVgpu]:
    'nodes.details.gpuList.resourceType.migBackedVgpu',
}
