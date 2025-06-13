import { EmailRecipientResponse, SettingStatus } from '@cube-frontend/api'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { emailRecipientToRow } from './emailRecipientMappers'
import { EmailRecipientRow } from './emailRecipientsUtils'

export const useSyncRecipientRows = (
  recipientsFromApi: EmailRecipientResponse[] | undefined,
  rowCount: number,
  setRows: Dispatch<SetStateAction<EmailRecipientRow[]>>,
): void => {
  const isInitializedRef = useRef(false)

  // Initialization effect.
  useEffect(() => {
    // Still loading.
    if (!recipientsFromApi) return

    // Already initialized.
    if (isInitializedRef.current) return

    // Initialize rows with api response.
    setRows(recipientsFromApi.map(emailRecipientToRow))
    isInitializedRef.current = true
  }, [recipientsFromApi, setRows])

  /**
   * Sync the status of rows that are still being updated.
   */
  const syncRowsStatus = useCallback((): void => {
    const newStatusMap: Map<string, SettingStatus> = new Map(
      recipientsFromApi!.map((recipient) => [
        recipient.address,
        recipient.status,
      ]),
    )

    setRows((prev) => {
      // TODO: Revisit this part in M2 when issues on the API side are fixed.
      const rowsToKeep = prev.filter((row) => {
        if (row.isDeleting) {
          // Currently when multiple email recipients are created simultaneously,
          // only the most recently initiated one will be included in the API response.
          // Any other email recipients in an updating status will be invisible until
          // the most recent one has completed its creation (when its `isUpdating` turns to `false`).
          // To avoid recipients abruptly vanishing during polling, we could only remove rows that
          // have an explicit deleting status.
          return newStatusMap.has(row.address)
        }
        return true
      })

      rowsToKeep.forEach((row) => {
        if (row.isNew || row.isEditing) return
        const newStatus = newStatusMap.get(row.address)
        if (newStatus) {
          row.status = newStatus
        }
      })

      return rowsToKeep
    })
  }, [recipientsFromApi, setRows])

  // Sync status effect.
  useEffect(() => {
    // Not initialized yet.
    if (!isInitializedRef.current) return

    // No rows to sync.
    if (!rowCount) return

    syncRowsStatus()
  }, [rowCount, syncRowsStatus])
}
