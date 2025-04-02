import { useMemo } from 'react'
import { CosTableRow } from '../CosBasicTable/cosTableUtils'

export const useCheckboxStatus = <Row extends CosTableRow>(
  rows: Row[],
  selectedRowIds: string[],
): boolean | null => {
  return useMemo(() => {
    // If no rows are selected, return false
    if (selectedRowIds.length === 0) return false

    // If all rows' `id` are selected, return true
    const enabledRows = rows.filter((row) => !row.disabled)
    if (enabledRows.every((row) => selectedRowIds.includes(row.id))) return true

    // If some rows are selected, return null (indeterminate state)
    return null
  }, [rows, selectedRowIds])
}
