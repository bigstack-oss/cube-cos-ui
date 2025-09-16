import { DeviceType, NodesApiListNodeDevicesRequest } from '@cube-frontend/api'
import { DeepPartial, Nullish } from '@cube-frontend/utils'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { ErrorRecord, validateBySchema } from '@cube-frontend/web-app/utils/zod'
import { merge } from 'lodash'
import { ChangeEvent, useContext, useMemo, useState } from 'react'
import {
  createEditableData,
  DeviceEditableData,
  deviceEditableDataSchema,
  DeviceRow,
} from './nodeDevicesUtils'
import { useSyncDeviceRows } from './useSyncDeviceRows'

type UseDeviceRows = {
  isLoading: boolean
  rows: DeviceRow[]
  rowsFieldError: ErrorRecord<DeviceEditableData>[]
  onDefinedClassChange: (row: DeviceRow, definedClass: DeviceType) => void
  onOSDReweightChange: (
    row: DeviceRow,
    e: ChangeEvent<HTMLInputElement>,
  ) => void
  onEditClick: (row: DeviceRow) => void
  onSaveClick: (row: DeviceRow) => Promise<void>
  onCancelEditClick: (row: DeviceRow) => void
}

export const useDeviceRows = (nodeName: string | undefined): UseDeviceRows => {
  const { dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<DeviceRow[]>([])

  const { isLoading, data: devices } = useCosStreamRequest(
    nodesApi.listNodeDevices,
    (): Nullish<NodesApiListNodeDevicesRequest> => {
      if (!nodeName) return null
      return {
        dataCenter: dataCenter!.name,
        nodeName,
      }
    },
  )

  useSyncDeviceRows(devices, setRows)

  const rowsFieldError = useMemo<ErrorRecord<DeviceEditableData>[]>(() => {
    return rows.map((row) =>
      validateBySchema(deviceEditableDataSchema, row.dataForEdit),
    )
  }, [rows])

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
    definedClass: DeviceType,
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
    const parsedData = deviceEditableDataSchema.safeParse(row.dataForEdit).data
    if (!parsedData) return

    patchRow(row.id, {
      isSaving: true,
    })

    const osdIds: string[] = row.osd.daemons.map((daemon) => daemon.id)

    try {
      await Promise.all([
        updateNodeDevice(row.device, parsedData.definedClass),
        reweightOSDs(osdIds, parsedData.osdReweight),
      ])
      // Keep row in editing & saving state while awaiting device info sync via
      // HTTP chunked transfer (watch).
      patchRow(row.id, {
        isSavingDone: true,
      })
    } catch {
      patchRow(row.id, {
        isSaving: false,
      })
    }
  }

  const updateNodeDevice = async (
    deviceName: string,
    definedClass: DeviceType,
  ): Promise<void> => {
    if (!nodeName) return
    try {
      await nodesApi.updateNodeDevice({
        dataCenter: dataCenter!.name,
        nodeName,
        deviceName,
        updateNodeDeviceRequest: {
          class: definedClass,
        },
      })
    } catch (error) {
      console.error('Update node device error: ', error)
      throw error
    }
  }

  const reweightOSDs = async (
    osdIds: string[],
    reweight: number,
  ): Promise<void> => {
    if (!nodeName) return
    try {
      const promises: Promise<unknown>[] = osdIds.map((osdId) =>
        nodesApi.updateNodeOsd({
          dataCenter: dataCenter!.name,
          nodeName,
          osdId,
          updateNodeOsdRequest: {
            reweight,
          },
        }),
      )
      await Promise.all(promises)
    } catch (error) {
      console.error('Update node device OSDs error: ', error)
      throw error
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
    rowsFieldError,
    onDefinedClassChange,
    onOSDReweightChange,
    onEditClick,
    onSaveClick,
    onCancelEditClick,
  }
}
