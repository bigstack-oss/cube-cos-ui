import {
  GPUProfile,
  GPUResourceType,
  ListNodeGPUCardsResponseDataInner,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

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
    return normalizeProfiles(resource.profiles?.migBackedVgpu ?? [])
  }

  return []
}
