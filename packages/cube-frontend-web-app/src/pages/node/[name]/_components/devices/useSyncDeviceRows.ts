import { ListNodeDevicesResponseDataInner } from '@cube-frontend/api'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
  blockDeviceToRow,
  DeviceRow,
  isDeviceOrOsdProcessing,
} from './nodeDevicesUtils'

export const useSyncDeviceRows = (
  devicesFromApi: ListNodeDevicesResponseDataInner[] | undefined,
  setRows: Dispatch<SetStateAction<DeviceRow[]>>,
): void => {
  useEffect(() => {
    if (devicesFromApi) {
      setRows((prevRows) => syncDeviceRows(prevRows, devicesFromApi))
    }
  }, [devicesFromApi, setRows])
}

const syncDeviceRows = (
  uiRows: DeviceRow[],
  apiData: ListNodeDevicesResponseDataInner[],
): DeviceRow[] => {
  const newRows: DeviceRow[] = []

  const uiRowsMap = new Map<string, DeviceRow>(
    uiRows.map((row) => [row.id, row]),
  )

  apiData.forEach((deviceFromApi) => {
    const uiRow: DeviceRow | undefined = uiRowsMap.get(deviceFromApi.device)
    const apiRow: DeviceRow = blockDeviceToRow(deviceFromApi)

    if (uiRow?.isEditing) {
      const shouldUseApiRow =
        uiRow.isSavingDone || isDeviceOrOsdProcessing(deviceFromApi)
      newRows.push(shouldUseApiRow ? apiRow : uiRow)
    } else {
      newRows.push(apiRow)
    }
  })

  return newRows
}
