import { useMemo, useState } from 'react'
import { TuningRow } from './tuningsUtils'

type UseTuningHostsModal = {
  isHostsModalOpen: boolean
  rowForHostModal: TuningRow | undefined
  onShowHostsClick: (row: TuningRow) => void
  onHostsModalClose: () => void
}

export const useTuningHostsModal = (rows: TuningRow[]): UseTuningHostsModal => {
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined,
  )

  const rowForHostModal = useMemo<TuningRow | undefined>(() => {
    if (!selectedRowId) {
      return undefined
    }
    return rows.find((row) => row.id == selectedRowId)
  }, [rows, selectedRowId])

  const onShowHostsClick = (row: TuningRow): void => {
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
