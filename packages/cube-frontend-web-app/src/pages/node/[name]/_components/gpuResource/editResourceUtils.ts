import { GpuResourceType, ResourceProfile } from '../mockResources'

export const gpuResourceSteps = ['edit', 'confirm'] as const
export const gpuResourceTypeOptions = [
  'passthrough',
  'sriovVgpu',
  'migVgpu',
] as const

export type GpuResourceStep = (typeof gpuResourceSteps)[number]
export type GpuResourceTypeOption = (typeof gpuResourceTypeOptions)[number]

export type GpuResourceProfileType = Pick<ResourceProfile, 'id' | 'counts'>

export type ProfileTableRow = ResourceProfile & {
  checked: boolean
}

export type ProfileTableKey = Extract<
  GpuResourceTypeOption,
  'sriovVgpu' | 'migVgpu'
>

export type EditGpuResourcePayload = {
  resourceType: GpuResourceTypeOption
  profiles: GpuResourceProfileType[]
}

export const optionToResourceType = (
  option: GpuResourceTypeOption,
): GpuResourceType => {
  switch (option) {
    case 'sriovVgpu':
      return GpuResourceType.SriovVgpu
    case 'migVgpu':
      return GpuResourceType.MigVgpu
    case 'passthrough':
      return GpuResourceType.Passthrough
  }
}
