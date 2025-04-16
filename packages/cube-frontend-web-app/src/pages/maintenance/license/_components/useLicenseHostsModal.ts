import { useMemo, useState } from 'react'
import { LicenseRow } from './LicenseTable'

export const useLicenseHostsModal = (rows: LicenseRow[]) => {
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined,
  )

  const rowForHostModal = useMemo<LicenseRow | undefined>(() => {
    if (!selectedRowId) {
      return undefined
    }
    return rows.find((row) => row.id == selectedRowId)
  }, [rows, selectedRowId])

  const onShowHostsClick = (row: LicenseRow): void => {
    setSelectedRowId(row.id)
  }

  const onHostsModalClose = (): void => {
    setSelectedRowId(undefined)
  }

  return {
    isHostsModalOpen: !!rowForHostModal,
    rowForHostModal,
    onShowHostsClick,
    onHostsModalClose,
  }
}
