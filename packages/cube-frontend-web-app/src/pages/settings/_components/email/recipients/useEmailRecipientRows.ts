import { EmailRecipientResponse } from '@cube-frontend/api'
import { DeepPartial } from '@cube-frontend/utils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useShowErrorToast } from '@cube-frontend/web-app/hooks/useShowErrorToast/useShowErrorToast'
import { merge } from 'lodash'
import { ChangeEvent, useContext, useState } from 'react'
import { createEmailRecipient } from './actions/createEmailRecipient'
import { deleteEmailRecipient as deleteEmailRecipientAction } from './actions/deleteEmailRecipient'
import { tryEmailRecipient } from './actions/tryEmailRecipient'
import { updateEmailRecipient } from './actions/updateEmailRecipient'
import { createNewRow, EmailRecipientRow } from './emailRecipientsUtils'
import { useSyncRecipientRows } from './useSyncRecipientRows'

type UseEmailRecipientRows = {
  rows: EmailRecipientRow[]
  onAddClick: () => void
  onEditClick: (rowId: string) => void
  onCancelEditClick: (rowId: string) => void
  onChange: (rowId: string, e: ChangeEvent<HTMLInputElement>) => void
  onTryClick: (rowId: string) => Promise<void>
  onSaveClick: (rowId: string) => Promise<void>
  deleteEmailRecipient: (rowId: string) => Promise<void>
}

export const useEmailRecipientRows = (
  recipientsFromApi?: EmailRecipientResponse[] | undefined,
): UseEmailRecipientRows => {
  const { dataCenter } = useContext(DataCenterContext)

  const showErrorToast = useShowErrorToast()

  const [rows, setRows] = useState<EmailRecipientRow[]>([])

  useSyncRecipientRows(recipientsFromApi, rows.length, setRows)

  const onAddClick = (): void => {
    setRows((prevRows) => [createNewRow(), ...prevRows])
  }

  const patchRow = (
    id: string,
    payload: DeepPartial<EmailRecipientRow>,
  ): void => {
    setRows((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => row.id === id)
      if (rowIndex < 0) {
        return prevRows
      }
      const nextRows = [...prevRows]
      merge(nextRows[rowIndex], payload)
      return nextRows
    })
  }

  const onEditClick = (rowId: string): void => {
    patchRow(rowId, { isEditing: true })
  }

  const onCancelEditClick = (rowId: string): void => {
    const targetRow = rows.find((row) => row.id === rowId)
    if (!targetRow) return

    if (targetRow.isNew) {
      // Remove the new row.
      setRows((prevRows) => prevRows.filter((row) => row.id !== targetRow.id))
    } else {
      // Reset the target row to the original state and exit editing state.
      patchRow(targetRow.id, {
        ...targetRow.originalState,
        isEditing: false,
      })
    }
  }

  const onChange = (rowId: string, e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    patchRow(rowId, {
      [name as keyof EmailRecipientResponse]: value,
    })
  }

  const onTryClick = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    await tryEmailRecipient({
      dataCenter: dataCenter!.name,
      row,
      patchRow,
      onError: showErrorToast,
    })
  }

  const onSaveClick = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    if (row.isNew) {
      await createEmailRecipient({
        dataCenter: dataCenter!.name,
        row,
        patchRow,
        onError: showErrorToast,
      })
    } else {
      await updateEmailRecipient({
        dataCenter: dataCenter!.name,
        row,
        patchRow,
        onError: showErrorToast,
      })
    }
  }

  const deleteEmailRecipient = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    await deleteEmailRecipientAction({
      dataCenter: dataCenter!.name,
      row,
      patchRow,
      onSuccess: () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId))
      },
      onError: showErrorToast,
    })
  }

  return {
    rows,
    onAddClick,
    onEditClick,
    onCancelEditClick,
    onChange,
    onTryClick,
    onSaveClick,
    deleteEmailRecipient,
  }
}
