import { ReactNode } from 'react'
import {
  COS_TABLE_SUB_ROW_SYMBOL,
  CosTableRow,
  RowClassNameProp,
} from '../cosTableUtils'

export type CosTableSubRowProps<ParentRow extends CosTableRow> = {
  className?: RowClassNameProp<ParentRow>
  children: ReactNode
  isVisible: (parentRow: ParentRow) => boolean
}

export const CosTableSubRow = <ParentRow extends CosTableRow>(
  _props: CosTableSubRowProps<ParentRow>,
) => {
  // The actual rendering logic is handled by CosBasicTable.
  return undefined
}

CosTableSubRow[COS_TABLE_SUB_ROW_SYMBOL] = true
