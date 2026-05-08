import { isValidElement, ReactElement, ReactNode } from 'react'
import { InfoTableColumnProps } from './InfoTableColumn'

export type InfoTableRow = {
  id: string
}

// Last chunk shorter rows use this sentinel so cells (and custom renders) stay blank
export const CHUNK_PLACEHOLDER_ROW_ID =
  '__infoTableChunkPlaceholderRow__' as const

export const isChunkPlaceholderRow = (row: InfoTableRow) =>
  row.id === CHUNK_PLACEHOLDER_ROW_ID

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
