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
      const newRows = [...prev]
      newRows.forEach((row) => {
        if (row.isEditing || !row.status.isUpdating) return

        const newStatus = newStatusMap.get(row.address)
        if (newStatus) {
          row.status = newStatus
        }
      })
      return newRows
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
