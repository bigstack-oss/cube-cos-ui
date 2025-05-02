import { useEffect, useMemo, useState } from 'react'
import { BatchLicenseAttachmentTableRow } from './LicenseAttachmentTable'

export const useLicenseAttachmentRowSelection = (
  licenseAttachmentRows: BatchLicenseAttachmentTableRow[],
) => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  const selectedLicenseAttachmentRows = useMemo<
    BatchLicenseAttachmentTableRow[]
  >(() => {
    if (!licenseAttachmentRows) return []
    const selectedRowIdsSet = new Set(selectedRowIds)
    return licenseAttachmentRows.filter((row) => selectedRowIdsSet.has(row.id))
  }, [licenseAttachmentRows, selectedRowIds])

  const handleRowCheckChange = (rowId: string, checked: boolean) => {
    setSelectedRowIds((prev) => {
      if (checked) {
        return [...prev, rowId]
      }
      return prev.filter((id) => id !== rowId)
    })
  }

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      const allRowIds =
        licenseAttachmentRows?.map(
          (licenseAttachment) => licenseAttachment.id,
        ) || []
      setSelectedRowIds(allRowIds)
    } else {
      setSelectedRowIds([])
    }
  }

  useEffect(() => {
    setSelectedRowIds([])
  }, [licenseAttachmentRows])

  return {
    selectedRowIds,
    selectedLicenseAttachmentRows,
    handleRowCheckChange,
    handleAllCheckChange,
  }
}
