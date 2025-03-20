import { useMemo, useState } from 'react'
import { EmailSenderRow } from './emailSendersUtils'

type UseVerifyEmailSenderModal = {
  isVerifyModalOpen: boolean
  toBeVerifiedRow: EmailSenderRow | undefined
  onVerifyClick: (rowId: string) => void
  onCloseVerifyModal: () => void
}

export const useVerifyEmailSenderModal = (
  rows: EmailSenderRow[],
): UseVerifyEmailSenderModal => {
  const [toBeVerifiedRowId, setToBeVerifiedRowId] = useState<
    string | undefined
  >(undefined)

  const toBeVerifiedRow = useMemo<EmailSenderRow | undefined>(() => {
    return rows.find((row) => row.id === toBeVerifiedRowId)
  }, [rows, toBeVerifiedRowId])

  const onVerifyClick = (rowId: string): void => {
    setToBeVerifiedRowId(rowId)
  }

  const onCloseVerifyModal = (): void => {
    setToBeVerifiedRowId(undefined)
  }

  return {
    isVerifyModalOpen: !!toBeVerifiedRow,
    toBeVerifiedRow,
    onVerifyClick,
    onCloseVerifyModal,
  }
}
