import { useCallback, useEffect, useState } from 'react'
import { ResourceRow } from '../NodeResources'
import { GpuResourceType, ResourceProfile } from '../mockResources'
import {
  EditGpuResourcePayload,
  GpuResourceTypeOption,
  optionToResourceType,
  ProfileTableKey,
  ProfileTableRow,
} from './editResourceUtils'

export type ProfileTable = Record<ProfileTableKey, ProfileTableRow[]>

const emptyProfileTable = (): ProfileTable => ({
  sriovVgpu: [],
  migVgpu: [],
})

const toProfileTableRow = (
  profile: ResourceProfile,
  isInitialActive: boolean,
): ProfileTableRow => {
  const { counts, ...rest } = profile
  return isInitialActive
    ? { ...rest, checked: counts > 0, counts }
    : { ...rest, checked: false, counts: 0 }
}

const initFromResource = (
  resource: ResourceRow,
): {
  selectedResourceType: GpuResourceTypeOption
  profileTable: ProfileTable
} | null => {
  const { resourceType, profiles } = resource

  if (resourceType === GpuResourceType.SriovVgpu) {
    return {
      selectedResourceType: 'sriovVgpu',
      profileTable: {
        sriovVgpu: profiles.map((p) => toProfileTableRow(p, true)),
        migVgpu: profiles.map((p) => toProfileTableRow(p, false)),
      },
    }
  }

  if (resourceType === GpuResourceType.MigVgpu) {
    return {
      selectedResourceType: 'migVgpu',
      profileTable: {
        sriovVgpu: profiles.map((p) => toProfileTableRow(p, false)),
        migVgpu: profiles.map((p) => toProfileTableRow(p, true)),
      },
    }
  }

  return null
}

export const useProfileTable = (resource: ResourceRow | undefined) => {
  const [selectedResourceType, setSelectedResourceType] =
    useState<GpuResourceTypeOption>('passthrough')

  const [profileTable, setProfileTable] =
    useState<ProfileTable>(emptyProfileTable)

  useEffect(() => {
    if (!resource) {
      setSelectedResourceType('passthrough')
      setProfileTable(emptyProfileTable())
      return
    }

    const next = initFromResource(resource)
    if (!next) return

    setSelectedResourceType(next.selectedResourceType)
    setProfileTable(next.profileTable)
  }, [resource])

  const onResourceTypeChange = useCallback(
    (resourceType: GpuResourceTypeOption) => {
      setSelectedResourceType(resourceType)
    },
    [],
  )

  const updateProfileRow = useCallback(
    (
      tableKey: ProfileTableKey,
      rowId: string,
      patch: Partial<Pick<ProfileTableRow, 'checked' | 'counts'>>,
    ) => {
      setProfileTable((prev) => ({
        ...prev,
        [tableKey]: prev[tableKey].map((row) =>
          row.id === rowId ? { ...row, ...patch } : row,
        ),
      }))
    },
    [],
  )

  const onSriovVgpuProfileCheck = useCallback(
    (rowId: string, checked: boolean) =>
      updateProfileRow('sriovVgpu', rowId, { checked }),
    [updateProfileRow],
  )

  const onSriovVgpuProfileCountsChange = useCallback(
    (rowId: string, counts: number) =>
      updateProfileRow('sriovVgpu', rowId, { counts }),
    [updateProfileRow],
  )

  const onMigVgpuProfileCheck = useCallback(
    (rowId: string, checked: boolean) =>
      updateProfileRow('migVgpu', rowId, { checked }),
    [updateProfileRow],
  )

  const onMigVgpuProfileCountsChange = useCallback(
    (rowId: string, counts: number) =>
      updateProfileRow('migVgpu', rowId, { counts }),
    [updateProfileRow],
  )

  const resetProfileForm = useCallback(() => {
    setSelectedResourceType('passthrough')
    setProfileTable(emptyProfileTable())
  }, [])

  const getConfirmTableData = useCallback((): ResourceRow | null => {
    if (!resource) return null

    const {
      profiles: _profiles,
      resourceType: _resourceType,
      ...rest
    } = resource

    const nextResourceType = optionToResourceType(selectedResourceType)

    if (selectedResourceType === 'passthrough') {
      return {
        ...rest,
        resourceType: nextResourceType,
        profiles: [],
      }
    }

    const currentProfileTable = profileTable[selectedResourceType]
    const filteredProfiles: ResourceProfile[] = currentProfileTable
      .filter((profile) => profile.checked && profile.counts > 0)
      .map(({ checked: _checked, ...profile }) => profile)

    return {
      ...rest,
      resourceType: nextResourceType,
      profiles: filteredProfiles,
    }
  }, [resource, selectedResourceType, profileTable])

  const getPayload = useCallback((): EditGpuResourcePayload | null => {
    const confirmTableData = getConfirmTableData()
    if (!confirmTableData) return null

    return {
      resourceType: selectedResourceType,
      profiles: confirmTableData.profiles.map((p) => ({
        id: p.id,
        counts: p.counts,
      })),
    }
  }, [getConfirmTableData, selectedResourceType])

  return {
    selectedResourceType,
    profileTable,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCheck,
    onMigVgpuProfileCountsChange,
    resetProfileForm,
    getConfirmTableData,
    getPayload,
  }
}
