import { isValidElement, ReactElement, ReactNode } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { CosTableColumnProps } from './rendering/CosTableColumn'
import { CosTableSubRowProps } from './rendering/CosTableSubRow'

export type CosTableRow = {
  id: string
}

export type CosBatchActionTableRow = CosTableRow & {
  checked?: boolean
  disabled?: boolean
}

export const COS_TABLE_COLUMN_SYMBOL = Symbol('CosTableColumn')

export const COS_TABLE_SUB_ROW_SYMBOL = Symbol('CosTableSubRow')

export const isCosTableColumn = <Row extends CosTableRow>(
  node: ReactNode,
): node is ReactElement<CosTableColumnProps<Row, keyof Row | never>> => {
  if (!isValidElement(node)) {
    return false
  }
  return typeof node.type === 'function' && COS_TABLE_COLUMN_SYMBOL in node.type
}

export const isCosTableSubRow = <ParentRow extends CosTableRow>(
  node: ReactNode,
): node is ReactElement<CosTableSubRowProps<ParentRow>> => {
  if (!isValidElement(node)) {
    return false
  }
  return (
    typeof node.type === 'function' && COS_TABLE_SUB_ROW_SYMBOL in node.type
  )
}

export type RowClassNameProp<Row extends CosTableRow> =
  | ClassNameValue
  | ((row: Row) => ClassNameValue)

export type ColumnEmphasizeProp<Row extends CosTableRow> =
  | boolean
  | ((row: Row) => boolean)

export const computeRowClassName = <Row extends CosTableRow>(
  prop: RowClassNameProp<Row> | undefined,
  row: Row,
): ClassNameValue => {
  if (typeof prop === 'function') {
    return prop(row)
  }
  return prop
}

export type CosViewDetailsTableDetailItem = {
  title: string
  value: string | number
}
