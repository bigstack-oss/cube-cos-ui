import { EmailSenderResponse, SettingStatus } from '@cube-frontend/api'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { emailSenderToRow } from './emailSenderMappers'
import {
  createNewRow,
  EmailSenderForUi,
  EmailSenderRow,
} from './emailSendersUtils'

const computeMapKey = (
  sender: EmailSenderResponse | EmailSenderForUi,
): string => {
  return `${sender.email},${sender.host}:${sender.port}`
}

export const useSyncSenderRows = (
  sendersFromApi: EmailSenderResponse[] | undefined,
  rowCount: number,
  setRows: Dispatch<SetStateAction<EmailSenderRow[]>>,
): void => {
  const isInitializedRef = useRef(false)

  // Initialization effect.
  useEffect(() => {
    // Still loading.
    if (!sendersFromApi) return

    // Already initialized.
    if (isInitializedRef.current) return

    if (sendersFromApi.length) {
      // Initialize rows with api response.
      setRows(sendersFromApi.map(emailSenderToRow))
    } else {
      // Create an empty row.
      setRows([createNewRow()])
    }

    isInitializedRef.current = true
  }, [sendersFromApi, setRows])

  /**
   * Sync the status of rows that are still being updated.
   */
  const syncRowsStatus = useCallback((): void => {
    const newStatusMap: Map<string, SettingStatus> = new Map(
      sendersFromApi!.map((sender) => [computeMapKey(sender), sender.status]),
    )

    setRows((prev) => {
      const newRows = [...prev]
      newRows.forEach((row) => {
        if (row.isNew || row.isEditing || !row.status.isUpdating) return

        const mapKey = computeMapKey(row)
        const newStatus = newStatusMap.get(mapKey)
        if (newStatus) {
          row.status = newStatus
        }
      })
      return newRows
    })
  }, [sendersFromApi, setRows])

  // Sync status effect.
  useEffect(() => {
    // Not initialized yet.
    if (!isInitializedRef.current) return

    // No rows to sync.
    if (!rowCount) return

    syncRowsStatus()
  }, [rowCount, syncRowsStatus])
}
