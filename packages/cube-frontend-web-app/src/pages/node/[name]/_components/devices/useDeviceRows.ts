import { DeepPartial } from '@cube-frontend/utils'
import { merge } from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  blockDeviceToRow,
  createEditableData,
  DeviceRow,
  mockDevices,
  NodeBlockDeviceInnerWaitingForApiUpdate,
  parseDeviceEditableData,
} from './nodeDevicesUtils'

type UseDeviceRows = {
  isLoading: boolean
  rows: DeviceRow[]
  onDefinedClassChange: (
    row: DeviceRow,
    definedClass: NodeBlockDeviceInnerWaitingForApiUpdate['class'],
  ) => void
  onOSDReweightChange: (
    row: DeviceRow,
    e: ChangeEvent<HTMLInputElement>,
  ) => void
  onEditClick: (row: DeviceRow) => void
  onSaveClick: (row: DeviceRow) => Promise<void>
  onCancelEditClick: (row: DeviceRow) => void
}

export const useDeviceRows = (hostname: string | undefined): UseDeviceRows => {
  // TODO: Replace this loading state with `useCosGetRequest` + useSequentialInterval.
  const [isLoading, setIsLoading] = useState(true)

  const [rows, setRows] = useState<DeviceRow[]>([])

  useEffect(() => {
    if (hostname) {
      console.log(`TODO: Fetch devices with hostname: ${hostname}`)
      setRows(mockDevices.map(blockDeviceToRow))
      setIsLoading(false)
    }
  }, [hostname])

  const patchRow = (rowId: string, payload: DeepPartial<DeviceRow>): void => {
    setRows((prev) => {
      const rowIndex = prev.findIndex((row) => row.id === rowId)
      if (rowIndex < 0) return prev
      const nextRows = [...prev]
      merge(nextRows[rowIndex], payload)
      return nextRows
    })
  }

  const onDefinedClassChange = (
    row: DeviceRow,
    definedClass: NodeBlockDeviceInnerWaitingForApiUpdate['class'],
  ): void => {
    patchRow(row.id, {
      dataForEdit: {
        definedClass,
      },
    })
  }

  const onOSDReweightChange = (
    row: DeviceRow,
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    patchRow(row.id, {
      dataForEdit: {
        osdReweight: e.target.value,
      },
    })
  }

  const onEditClick = (row: DeviceRow): void => {
    patchRow(row.id, {
      isEditing: true,
    })
  }

  const onSaveClick = async (row: DeviceRow): Promise<void> => {
    const parsedData = parseDeviceEditableData(row.dataForEdit)
    console.log({
      dataForEdit: row.dataForEdit,
      parsedData,
    })
    if (!parsedData) return

    patchRow(row.id, {
      isSaving: true,
    })

    try {
      if (row.class !== row.dataForEdit.definedClass) {
        await promoteOrDemoteDevice(row.device, parsedData.definedClass)
      }

      if (row.osd.reweight !== parsedData.osdReweight) {
        await reweightOsds(
          row.osd.daemons.map((daemon) => daemon.id),
          parsedData.osdReweight,
        )
      }

      patchRow(row.id, {
        isSaving: false,
        isEditing: false,
      })
    } catch {
      patchRow(row.id, {
        isSaving: false,
      })
    }
  }

  const promoteOrDemoteDevice = async (
    deviceId: string,
    definedClass: NodeBlockDeviceInnerWaitingForApiUpdate['class'],
  ): Promise<boolean> => {
    try {
      // TODO: Call promote/demote API.
      return true
    } catch (error) {
      console.error('Promote/demote device error: ', error)
      return false
    }
  }

  const reweightOsds = async (
    osdIds: string[],
    reweight: number,
  ): Promise<void> => {
    try {
      // TODO: Call reweight OSDs API for each OSD.
    } catch (error) {
      console.error('Reweight device OSDs error: ', error)
    }
  }

  const onCancelEditClick = (row: DeviceRow): void => {
    patchRow(row.id, {
      dataForEdit: createEditableData(row),
      isEditing: false,
    })
  }

  return {
    isLoading,
    rows,
    onDefinedClassChange,
    onOSDReweightChange,
    onEditClick,
    onSaveClick,
    onCancelEditClick,
  }
}
