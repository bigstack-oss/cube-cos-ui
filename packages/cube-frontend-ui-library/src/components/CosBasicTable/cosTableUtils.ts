import { isValidElement, ReactElement, ReactNode } from 'react'
import { CosTableColumnProps } from './rendering/CosTableColumn'

export type CosTableRow = {
  id: string
}

export const COS_TABLE_COLUMN_SYMBOL = Symbol('CosTableColumn')

export const isCosTableColumn = <Row extends CosTableRow>(
  node: ReactNode,
): node is ReactElement<CosTableColumnProps<Row>> => {
  if (!isValidElement(node)) {
    return false
  }
  return typeof node.type === 'function' && COS_TABLE_COLUMN_SYMBOL in node.type
}
