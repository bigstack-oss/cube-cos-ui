import { EmailSenderResponse } from '@cube-frontend/api'
import { DeepPartial } from '@cube-frontend/utils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { merge } from 'lodash'
import { ChangeEvent, useContext, useState } from 'react'
import { createEmailSender } from './actions/createEmailSender'
import { updateEmailSender } from './actions/updateEmailSender'
import { EmailSenderRow } from './emailSendersUtils'
import { useSyncSenderRows } from './useSyncSenderRows'

export type UseEmailSenderRows = {
  rows: EmailSenderRow[]
  onEditClick: (rowId: string) => void
  onCancelEditClick: (rowId: string) => void
  onChange: (rowId: string, e: ChangeEvent<HTMLInputElement>) => void
  onSaveClick: (rowId: string) => Promise<void>
  onSenderVerified: (rowId: string) => void
}

export const useEmailSenderRows = (
  sendersFromApi: EmailSenderResponse[] | undefined,
): UseEmailSenderRows => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<EmailSenderRow[]>([])

  useSyncSenderRows(sendersFromApi, rows.length, setRows)

  const patchRow = (id: string, payload: DeepPartial<EmailSenderRow>): void => {
    setRows((prevRows) => {
      const nextRows = [...prevRows]
      const targetRow = nextRows.find((row) => row.id === id)
      if (!targetRow) {
        return prevRows
      }
      merge(targetRow, payload)
      return nextRows
    })
  }

  const onEditClick = (rowId: string): void => {
    patchRow(rowId, { isEditing: true })
  }

  const onCancelEditClick = (rowId: string): void => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    // Reset the target row to the original state and exit editing state.
    patchRow(row.id, {
      ...row.originalState,
      isEditing: false,
    })
  }

  const onChange = (rowId: string, e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    patchRow(rowId, {
      [name as keyof EmailSenderResponse]: value,
    })
  }

  const onSaveClick = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    if (row.isNew) {
      await createEmailSender({
        dataCenter,
        row,
        patchRow,
      })
    } else {
      await updateEmailSender({
        dataCenter,
        row,
        patchRow,
      })
    }
  }

  const onSenderVerified = (rowId: string): void => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    patchRow(rowId, {
      originalState: {
        ...row.originalState,
        accessVerified: true,
      },
      isVerifying: false,
      accessVerified: true,
    })
  }

  return {
    rows,
    onEditClick,
    onCancelEditClick,
    onChange,
    onSaveClick,
    onSenderVerified,
  }
}
