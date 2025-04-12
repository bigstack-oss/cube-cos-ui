import { useMemo } from 'react'
import { CosBatchActionTableRow } from '../CosBasicTable/cosTableUtils'

export const useHeaderCheckboxStatus = <Row extends CosBatchActionTableRow>(
  rows: Row[],
  selectedRowIdSet: Set<string>,
): boolean | null => {
  return useMemo(() => {
    // If no rows are selected, return false
    if (selectedRowIdSet.size === 0) return false

    const enabledRows = rows.filter((row) => !row.disabled)

    // All enabled row IDs are in the selected set
    const allSelected = enabledRows.every((row) => selectedRowIdSet.has(row.id))
    if (allSelected) return true

    // If some rows are selected, return null (indeterminate state)
    return null
  }, [rows, selectedRowIdSet])
}
