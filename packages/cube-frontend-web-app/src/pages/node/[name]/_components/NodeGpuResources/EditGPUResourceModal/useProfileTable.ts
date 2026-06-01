import { produce } from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  GPUSupportResourceType,
  ListNodeGPUCardsResponseDataInner,
} from '@cube-frontend/api'
import {
  createFormState,
  getConfirmTableData,
  getProfileLimits,
  ProfileFormSummary,
  ProfileLimits,
  ProfileTable,
  ProfileTableKey,
  ProfileTableRow,
  sumActiveMigBackedVgpuProfileUsage,
  sumActiveSriovVgpuProfileUsage,
} from './editGPUResourceUtils'

export type UseProfileTable = {
  editingResource: ListNodeGPUCardsResponseDataInner
  selectedResourceType: GPUSupportResourceType | null
  profileTable: ProfileTable
  profileLimits: ProfileLimits
  profileFormSummary: ProfileFormSummary
  isActionButtonDisabled: boolean
  confirmTableData: ListNodeGPUCardsResponseDataInner | null
  onResourceTypeChange: (resourceType: GPUSupportResourceType) => void
  onSriovVgpuProfileCheck: (rowId: string, checked: boolean) => void
  onMigVgpuProfileCheck: (rowId: string, checked: boolean) => void
  onSriovVgpuProfileCountsChange: (rowId: string, counts: number) => void
  onMigVgpuProfileCountsChange: (rowId: string, counts: number) => void
  resetProfileForm: () => void
}

export const useProfileTable = (
  resource: ListNodeGPUCardsResponseDataInner,
): UseProfileTable => {
  const [formState, setFormState] = useState<{
    editingResource: ListNodeGPUCardsResponseDataInner
    selectedResourceType: GPUSupportResourceType | null
    profileTable: ProfileTable
  }>(() => createFormState(resource))

  const { editingResource, selectedResourceType, profileTable } = formState

  useEffect(() => {
    if (editingResource.id === resource.id) return

    setFormState(createFormState(resource))
  }, [editingResource.id, resource])

  const setSelectedResourceType = (type: GPUSupportResourceType | null) => {
    setFormState((prev) => ({ ...prev, selectedResourceType: type }))
  }

  const setProfileTable = (updater: (prev: ProfileTable) => ProfileTable) => {
    setFormState((prev) => ({
      ...prev,
      profileTable: updater(prev.profileTable),
    }))
  }

  const onResourceTypeChange = useCallback(
    (resourceType: GPUSupportResourceType) =>
      setSelectedResourceType(resourceType),
    [],
  )

  const updateProfileRow = useCallback(
    (
      tableKey: ProfileTableKey,
      rowId: string,
      patch: Partial<Pick<ProfileTableRow, 'count' | 'checked'>>,
    ) => {
      setProfileTable((prev) =>
        produce(prev, (draft) => {
          const row = draft[tableKey].find((r) => r.id === rowId)
          if (row) {
            Object.assign(row, patch)
          }
        }),
      )
    },
    [],
  )

  const handleProfileCheck = useCallback(
    (tableKey: ProfileTableKey, rowId: string, checked: boolean) => {
      updateProfileRow(tableKey, rowId, { checked })
    },
    [updateProfileRow],
  )

  const handleProfileCountsChange = useCallback(
    (tableKey: ProfileTableKey, rowId: string, count: number) => {
      const patch: Partial<Pick<ProfileTableRow, 'count' | 'checked'>> = {
        count,
      }
      if (count > 0) patch.checked = true
      updateProfileRow(tableKey, rowId, patch)
    },
    [updateProfileRow],
  )

  const onSriovVgpuProfileCheck = (rowId: string, checked: boolean) =>
    handleProfileCheck('sriovVgpu', rowId, checked)

  const onSriovVgpuProfileCountsChange = (rowId: string, count: number) =>
    handleProfileCountsChange('sriovVgpu', rowId, count)

  const onMigVgpuProfileCheck = (rowId: string, checked: boolean) =>
    handleProfileCheck('migBackedVgpu', rowId, checked)

  const onMigVgpuProfileCountsChange = (rowId: string, count: number) =>
    handleProfileCountsChange('migBackedVgpu', rowId, count)

  const resetProfileForm = useCallback(() => {
    setFormState(createFormState(resource))
  }, [resource])

  const profileLimits = useMemo(
    () => getProfileLimits(editingResource),
    [editingResource],
  )

  const profileFormSummary = useMemo<ProfileFormSummary>(() => {
    const { sriovVgpu: sriovVgpuTable, migBackedVgpu: migBackedVgpuTable } =
      profileTable

    const sriovVgpu = sumActiveSriovVgpuProfileUsage(sriovVgpuTable)
    const migBackedVgpu = sumActiveMigBackedVgpuProfileUsage(migBackedVgpuTable)

    return { sriovVgpu, migBackedVgpu }
  }, [profileTable])

  const isActionButtonDisabled = useMemo(() => {
    if (!selectedResourceType) return true

    if (selectedResourceType === 'pgpu') return false

    const isCheckedProfilesEmpty = !profileTable[selectedResourceType].some(
      (profile) => profile.checked && profile.count > 0,
    )
    const isCountsLimitExceeded =
      selectedResourceType === 'sriovVgpu'
        ? profileFormSummary.sriovVgpu.count > profileLimits.count
        : profileFormSummary.migBackedVgpu.count > profileLimits.count ||
          profileFormSummary.migBackedVgpu.vramMiB > profileLimits.vramMiB

    return isCheckedProfilesEmpty || isCountsLimitExceeded
  }, [
    profileFormSummary,
    profileLimits.count,
    profileLimits.vramMiB,
    profileTable,
    selectedResourceType,
  ])

  const confirmTableData =
    useMemo<ListNodeGPUCardsResponseDataInner | null>(() => {
      if (!selectedResourceType) return null

      return getConfirmTableData({
        resource: editingResource,
        selectedResourceType,
        selectedProfileTableRow:
          selectedResourceType === 'pgpu'
            ? []
            : profileTable[selectedResourceType],
      })
    }, [editingResource, selectedResourceType, profileTable])

  return {
    editingResource,
    selectedResourceType,
    profileTable,
    profileLimits,
    profileFormSummary,
    isActionButtonDisabled,
    confirmTableData,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCheck,
    onMigVgpuProfileCountsChange,
    resetProfileForm,
  }
}
