import { ReactNode } from 'react'
import { COS_TABLE_COLUMN_SYMBOL, CosTableRow } from '../cosTableUtils'
import { ColumnCompareFnMap } from '../sorting/sortingUtils'

export type CosTableColumnSkeletonVariant =
  | 'regular'
  | 'subtext-vertical'
  | 'subtext-horizontal'
  | 'icon-left'
  | 'icon-right'
  | 'icon-vertical'
  | 'icon-only'
  | 'with-barchart'
  | 'status'

export type CosTableColumnProps<
  Row extends CosTableRow,
  Property extends keyof Row = keyof Row,
> = {
  label?: string
  property?: Property
  emphasize?: boolean
  isSortable?: boolean
  /**
   * Function that determines whether the two elements are sorted.
   */
  sortingCompareFnMap?: ColumnCompareFnMap<Row[Property]>
  children?:
    | ReactNode
    | ((propertyValue: Row[Property], row: Row, rowIndex: number) => ReactNode)
  /**
   * @default 'regular'
   */
  skeletonVariant?: CosTableColumnSkeletonVariant
}

// Wrapper function to help TypeScript correctly infer the type of `Row[Property]`.
export const CreateCosTableColumn = <Row extends CosTableRow>() => {
  type ColumnProps<Property extends keyof Row> = CosTableColumnProps<
    Row,
    Property
  >

  const CosTableColumn = <Property extends keyof Row>(
    _props: ColumnProps<Property>,
  ) => {
    // The column component defines the schema for a table column, including its
    // headers and body cells.
    // The actual rendering logic is handled by the table component.
    return undefined
  }

  CosTableColumn[COS_TABLE_COLUMN_SYMBOL] = true

  return CosTableColumn
}
