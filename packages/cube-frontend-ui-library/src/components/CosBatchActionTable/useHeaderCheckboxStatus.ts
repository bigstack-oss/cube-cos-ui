import { useMemo } from 'react'
import { CosBatchActionTableRow } from '../CosBasicTable/cosTableUtils'

export const useHeaderCheckboxStatus = <Row extends CosBatchActionTableRow>(
  rows: Row[],
  selectedRowIds: string[],
): boolean | null => {
  return useMemo(() => {
    // If no rows are selected, return false
    if (selectedRowIds.length === 0) return false

    const selectedSet = new Set(selectedRowIds)
    const enabledRows = rows.filter((row) => !row.disabled)

    // All enabled row IDs are in the selected set
    const allSelected = enabledRows.every((row) => selectedSet.has(row.id))
    if (allSelected) return true

    // If some rows are selected, return null (indeterminate state)
    return null
  }, [rows, selectedRowIds])
}
