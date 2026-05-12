import { isValidElement, ReactElement, ReactNode } from 'react'
import { InfoTableColumnProps } from './InfoTableColumn'

export type InfoTableRow = {
  id: string
}

// Internal marker for compound-component parsing.
// We tag `InfoTable.Column` with this symbol so `InfoTableBase` can safely
// identify and extract only column definition children.
export const INFO_TABLE_COLUMN_SYMBOL = Symbol('InfoTableColumn')

export const isInfoTableColumn = <Row extends InfoTableRow>(
  node: ReactNode,
): node is ReactElement<InfoTableColumnProps<Row, keyof Row | never>> => {
  if (!isValidElement(node)) {
    return false
  }
  return (
    typeof node.type === 'function' && INFO_TABLE_COLUMN_SYMBOL in node.type
  )
}
