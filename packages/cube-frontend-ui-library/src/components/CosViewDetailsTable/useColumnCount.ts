import { Children, ReactNode, useEffect, useState } from 'react'
import { CosTableRow, isCosTableColumn } from '../CosBasicTable/cosTableUtils'

// CosViewDetailsTable is built on top of CosBasicTable, so passing the column
// count from the base (CosBasicTable) up to CosViewDetailsTable (or any other
// table built on top of it) would take extra effort.
// To keep things simple, we calculate the column count here for now.
export const useColumnCount = (children: ReactNode): number => {
  const [columnCount, setColumnCount] = useState(0)

  useEffect(() => {
    const columnNodeCount = Children.toArray(children).filter((child) => {
      return isCosTableColumn<CosTableRow>(child)
    }).length
    setColumnCount(columnNodeCount)
  }, [children])

  return columnCount
}
