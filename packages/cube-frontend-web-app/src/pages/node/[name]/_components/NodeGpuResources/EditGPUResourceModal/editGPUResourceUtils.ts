import {
  GPUProfile,
  GPUSupportResourceType,
  ListNodeGPUCardsResponseDataInner,
  UpdateNodeGPUCardPutRequest,
  UpdateNodeGPUCardPutRequestProfilesInner,
} from '@cube-frontend/api'
import { GPUProfileRow } from '../utils'

export const gpuResourceSteps = ['edit', 'confirm'] as const

export type GpuResourceStep = (typeof gpuResourceSteps)[number]

export type ProfileTableRow = GPUProfileRow & {
  checked: boolean
}

export type ProfileTableKey = Extract<
  GPUSupportResourceType,
  'sriovVgpu' | 'migBackedVgpu'
>

export type ProfileTable = Record<ProfileTableKey, ProfileTableRow[]>

export const emptyProfileTable = (): ProfileTable => ({
  sriovVgpu: [],
  migBackedVgpu: [],
})

export const toProfileTableRow = (
  profile: GPUProfile,
  isInitialActive: boolean,
): ProfileTableRow => {
  const { count, id, ...rest } = profile

  return isInitialActive
    ? { ...rest, id: id.toString(), checked: count > 0, count }
    : { ...rest, id: id.toString(), checked: false, count: 0 }
}

const initGpuResourceForm = (
  resource: ListNodeGPUCardsResponseDataInner,
): {
  selectedResourceType: GPUSupportResourceType | null
  profileTable: ProfileTable
} => {
  const { resourceType, supportResourceTypes, profiles } = resource

  return {
    selectedResourceType:
      resourceType === 'unset'
        ? (supportResourceTypes[0] ?? null)
        : resourceType,
    profileTable: {
      sriovVgpu: (profiles.sriovVgpu ?? []).map((p) =>
        toProfileTableRow(p, resourceType === 'sriovVgpu'),
      ),
      migBackedVgpu: (profiles.migBackedVgpu ?? []).map((p) =>
        toProfileTableRow(p, resourceType === 'migBackedVgpu'),
      ),
    },
  }
}

export const createFormState = (
  resource: ListNodeGPUCardsResponseDataInner,
) => {
  const editingResource = structuredClone(resource)
  const initForm = initGpuResourceForm(editingResource)

  return {
    editingResource,
    selectedResourceType: initForm.selectedResourceType,
    profileTable: initForm.profileTable,
  }
}

export type ProfileLimits = {
  count: number
  vramMiB: number
}

export const getProfileLimits = (
  resource: ListNodeGPUCardsResponseDataInner,
): ProfileLimits => ({
  count: resource.profileCountLimit ?? Number.POSITIVE_INFINITY,
  vramMiB: resource.vram.totalMiB,
})

export type ProfileFormSummary = {
  sriovVgpu: { count: number }
  migBackedVgpu: { vramMiB: number }
}

const getActiveProfileRows = (rows: ProfileTableRow[]): ProfileTableRow[] =>
  rows.filter((row) => row.checked && row.count > 0)

export const sumActiveSriovVgpuProfileUsage = (
  rows: ProfileTableRow[],
): ProfileFormSummary['sriovVgpu'] =>
  getActiveProfileRows(rows).reduce(
    (acc, { count }) => ({
      count: acc.count + count,
    }),
    { count: 0 },
  )

export const checkActiveSriovVgpuProfileValidity = (
  limits: ProfileLimits,
  summary: ProfileFormSummary['sriovVgpu'],
): boolean => {
  return summary.count <= limits.count
}

export const sumActiveMigBackedVgpuProfileUsage = (
  rows: ProfileTableRow[],
): ProfileFormSummary['migBackedVgpu'] =>
  getActiveProfileRows(rows).reduce(
    (acc, { count, vramMiB }) => ({
      vramMiB: acc.vramMiB + count * vramMiB,
    }),
    { vramMiB: 0 },
  )

export const checkActiveMigBackedVgpuProfileValidity = (
  limits: ProfileLimits,
  summary: ProfileFormSummary['migBackedVgpu'],
  rows: ProfileTable['migBackedVgpu'],
): boolean => {
  const activeRows = getActiveProfileRows(rows)
  return (
    summary.vramMiB <= limits.vramMiB &&
    activeRows.every(
      (row) => row.countLimit === null || row.count <= row.countLimit,
    )
  )
}

type GetConfirmTableDataProps = {
  resource: ListNodeGPUCardsResponseDataInner
  selectedResourceType: GPUSupportResourceType | null
  selectedProfileTableRow: ProfileTableRow[]
}

export type ConfirmTableData = Pick<
  ListNodeGPUCardsResponseDataInner,
  'name' | 'resourceType' | 'pciAddress'
> & {
  editedProfiles: ProfileTableRow[]
}

export const getConfirmTableData = (
  props: GetConfirmTableDataProps,
): ConfirmTableData | null => {
  const { resource, selectedResourceType, selectedProfileTableRow } = props

  if (!selectedResourceType) return null

  const filteredProfiles: ProfileTableRow[] = getActiveProfileRows(
    selectedProfileTableRow,
  )

  return {
    name: resource.name,
    pciAddress: resource.pciAddress,
    resourceType: selectedResourceType,
    editedProfiles: filteredProfiles,
  }
}

type GetPayloadProps = {
  selectedResourceType: GPUSupportResourceType | null
  confirmTableData: ConfirmTableData | null
}

export const getPayload = (
  props: GetPayloadProps,
): UpdateNodeGPUCardPutRequest | null => {
  const { selectedResourceType, confirmTableData } = props

  if (!selectedResourceType || !confirmTableData) return null

  const profiles =
    selectedResourceType === 'pgpu'
      ? undefined
      : (confirmTableData.editedProfiles.map((p) => ({
          id: p.id,
          count: p.count,
        })) satisfies UpdateNodeGPUCardPutRequestProfilesInner[])

  return {
    resourceType: selectedResourceType,
    profiles,
  }
}
