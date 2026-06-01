import { omit } from 'lodash'
import {
  GPUResourceType,
  GPUSupportResourceType,
  ListNodeGPUCardsResponseDataInner,
  ListNodeGPUCardsResponseDataInnerProfilesInner,
  UpdateNodeGPUCardPutRequest,
  UpdateNodeGPUCardPutRequestProfilesInner,
} from '@cube-frontend/api'

export const gpuResourceSteps = ['edit', 'confirm'] as const

export type GpuResourceStep = (typeof gpuResourceSteps)[number]

export const resourceTypeLabelMap: Record<GPUSupportResourceType, string> = {
  pgpu: 'Passthrough',
  sriovVgpu: 'SR-IOV vGPU',
  migBackedVgpu: 'MIG-backed vGPU',
}

export const getResourceTypeLabel = (resourceType: GPUResourceType): string => {
  return resourceType === 'unset' ? '' : resourceTypeLabelMap[resourceType]
}

export type ProfileTableRow = ListNodeGPUCardsResponseDataInnerProfilesInner & {
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
  profile: ListNodeGPUCardsResponseDataInnerProfilesInner,
  isInitialActive: boolean,
): ProfileTableRow => {
  const { count, ...rest } = profile

  return isInitialActive
    ? { ...rest, checked: count > 0, count }
    : { ...rest, checked: false, count: 0 }
}

const initGpuResourceForm = (
  resource: ListNodeGPUCardsResponseDataInner,
): {
  selectedResourceType: GPUSupportResourceType | null
  profileTable: ProfileTable
} => {
  const { resourceType, supportResourceTypes, profiles } = resource

  const rows = profiles ?? []

  return {
    selectedResourceType:
      resourceType === 'unset'
        ? (supportResourceTypes[0] ?? null)
        : resourceType,
    profileTable: {
      sriovVgpu: rows.map((p) =>
        toProfileTableRow(p, resourceType === 'sriovVgpu'),
      ),
      migBackedVgpu: rows.map((p) =>
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
  vramMiB: resource.vramLimitMiB ?? Number.POSITIVE_INFINITY,
})

export type ProfileFormSummary = {
  sriovVgpu: { count: number }
  migBackedVgpu: { count: number; vramMiB: number }
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

export const sumActiveMigBackedVgpuProfileUsage = (
  rows: ProfileTableRow[],
): ProfileFormSummary['migBackedVgpu'] =>
  getActiveProfileRows(rows).reduce(
    (acc, { count, vramMiB }) => ({
      count: acc.count + count,
      vramMiB: acc.vramMiB + count * vramMiB,
    }),
    { count: 0, vramMiB: 0 },
  )

type GetConfirmTableDataProps = {
  resource: ListNodeGPUCardsResponseDataInner
  selectedResourceType: GPUSupportResourceType | null
  selectedProfileTableRow: ProfileTableRow[]
}

export const getConfirmTableData = (
  props: GetConfirmTableDataProps,
): ListNodeGPUCardsResponseDataInner | null => {
  const { resource, selectedResourceType, selectedProfileTableRow } = props

  if (!selectedResourceType) return null

  const rest = omit(resource, ['profiles', 'resourceType'])

  const filteredProfiles: ListNodeGPUCardsResponseDataInnerProfilesInner[] =
    getActiveProfileRows(selectedProfileTableRow).map((row) =>
      omit(row, 'checked'),
    )

  return {
    ...rest,
    resourceType: selectedResourceType,
    profiles: selectedResourceType === 'pgpu' ? [] : filteredProfiles,
  }
}

type GetPayloadProps = {
  selectedResourceType: GPUSupportResourceType | null
  confirmTableData: ListNodeGPUCardsResponseDataInner | null
}

export const getPayload = (
  props: GetPayloadProps,
): UpdateNodeGPUCardPutRequest | null => {
  const { selectedResourceType, confirmTableData } = props

  if (!selectedResourceType || !confirmTableData) return null

  const profiles =
    selectedResourceType === 'pgpu'
      ? undefined
      : ((confirmTableData.profiles?.map((p) => ({
          id: p.id,
          count: p.count,
        })) ?? []) satisfies UpdateNodeGPUCardPutRequestProfilesInner[])

  return {
    resourceType: selectedResourceType,
    profiles,
  }
}
