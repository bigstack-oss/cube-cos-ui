import { EmailSenderResponse } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { createEmailSender } from './actions/createEmailSender'
import { updateEmailSender } from './actions/updateEmailSender'
import { emailSenderToRow } from './emailSenderMappers'
import { createNewRow, EmailSenderRow } from './emailSendersUtils'

export type UseEmailSenderRows = {
  rows: EmailSenderRow[]
  onEditClick: (rowId: string) => void
  onCancelEditClick: (rowId: string) => void
  onChange: (rowId: string, e: ChangeEvent<HTMLInputElement>) => void
  onSaveClick: (rowId: string) => Promise<void>
  onSenderVerified: (rowId: string) => void
}

export const useEmailSenderRows = (
  initialEmailSenders: EmailSenderResponse[] | undefined,
): UseEmailSenderRows => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<EmailSenderRow[]>([])

  useEffect(() => {
    if (!initialEmailSenders) {
      return
    }

    if (initialEmailSenders.length) {
      setRows(initialEmailSenders.map(emailSenderToRow))
    } else {
      setRows([createNewRow()])
    }
  }, [initialEmailSenders])

  const patchRow = (id: string, payload: Partial<EmailSenderRow>): void => {
    setRows((prevRows) => {
      const nextRows = [...prevRows]
      const targetRow = nextRows.find((row) => row.id === id)
      if (targetRow) {
        Object.assign(targetRow, payload)
      }
      return nextRows
    })
  }

  const onEditClick = (rowId: string): void => {
    patchRow(rowId, { isEditing: true })
  }

  const onCancelEditClick = (rowId: string): void => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return
    }

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
    if (!row) {
      return
    }

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
    if (!row) {
      return
    }
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
