import {
  ComponentProps,
  ComponentType,
  Fragment,
  PropsWithChildren,
  useMemo,
} from 'react'
import { twMerge } from 'tailwind-merge'
import {
  computeRowClassName,
  CosTableRow,
  RowClassNameProp,
} from './cosTableUtils'
import { CreateCosTableColumn } from './rendering/CosTableColumn'
import {
  bodyTrCellBorderRadiusClass,
  cosTableStyles,
} from './rendering/cosTableStyles'
import { CosTableTd } from './rendering/CosTableTd'
import { CosTableTdEmpty } from './rendering/CosTableTdEmpty'
import { CosTableTh } from './rendering/CosTableTh'
import { SortingState } from './sorting/sortingUtils'
import { useSortedRows } from './sorting/useSortedRows'
import { useColumnPayloads } from './useColumnPayloads'
import { useSubRows } from './useSubRows'

export type CosBasicTableProps<Row extends CosTableRow> = PropsWithChildren<{
  rows: Row[]
  defaultSortingState?: SortingState<Row>
  isLoading?: boolean
  /**
   * @default 5
   */
  skeletonRowCount?: number
  rowClassName?: RowClassNameProp<Row>
  onRowClick?: (row: Row) => void
}>

export const CosBasicTable = <Row extends CosTableRow>(
  props: CosBasicTableProps<Row>,
) => {
  const {
    children,
    rows,
    defaultSortingState,
    isLoading,
    skeletonRowCount = 5,
    rowClassName,
    onRowClick,
  } = props

  const { columns, rowCompareFnMapRef } = useColumnPayloads<Row>(children)

  const subRows = useSubRows<Row>(children)

  const { sortedRows, sortingState, onSortDirectionChange } = useSortedRows(
    rows,
    columns,
    defaultSortingState,
    rowCompareFnMapRef,
  )

  const skeletonIndexes = useMemo<number[]>(() => {
    return Array.from(Array(skeletonRowCount).keys()).map((_, index) => index)
  }, [skeletonRowCount])

  const renderSkeletonRows = () => {
    return skeletonIndexes.map((rowIndex) => (
      <tr key={rowIndex} className={bodyTrCellBorderRadiusClass}>
        {columns.map((column, colIndex) => (
          <CosTableTd
            key={`${column.property?.toString() ?? ''}-${colIndex}`}
            rowIndex={rowIndex}
            column={column}
            isLoading={isLoading}
          />
        ))}
      </tr>
    ))
  }

  const renderEmptyRow = () => (
    <tr>
      <CosTableTdEmpty length={columns.length} />
    </tr>
  )

  const renderDataRows = () => {
    if (sortedRows.length === 0) return renderEmptyRow()

    return sortedRows.map((row, rowIndex) => (
      <Fragment key={row.id}>
        <tr
          className={twMerge(
            cosTableStyles.bodyTr(),
            computeRowClassName(rowClassName, row),
          )}
          onClick={() => onRowClick?.(row)}
        >
          {columns.map((column, colIndex) => (
            <CosTableTd
              key={`${column.property?.toString() ?? ''}-${colIndex}`}
              row={row}
              rowIndex={rowIndex}
              column={column}
            />
          ))}
        </tr>
        {renderSubRows(row)}
      </Fragment>
    ))
  }

  const renderSubRows = (parentRow: Row) => {
    if (!subRows.length) return undefined

    return subRows.map((subRow, subRowIndex) => {
      const { className, isVisible } = subRow.props
      return (
        <tr
          key={`${parentRow.id}-sub-row-${subRowIndex}`}
          className={twMerge(
            cosTableStyles.bodyTr(),
            computeRowClassName(className, parentRow),
            !isVisible(parentRow) && 'invisible [&>td]:p-0',
          )}
        >
          {subRow.columns.map((column, columnIndex) => (
            <CosTableTd
              key={columnIndex}
              row={parentRow}
              rowIndex={subRowIndex}
              column={column}
            />
          ))}
        </tr>
      )
    })
  }

  return (
    <div className="overflow-auto">
      <table className={cosTableStyles.table()}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <CosTableTh
                key={`${column.property?.toString() ?? ''}-${index}`}
                column={column}
                sortingState={sortingState}
                onSortClick={() => onSortDirectionChange(column.property!)}
                isTableEmpty={sortedRows.length === 0}
              />
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? renderSkeletonRows() : renderDataRows()}</tbody>
      </table>
    </div>
  )
}

CosBasicTable.Column = CreateCosTableColumn()

type CosBasicTableWithColumn<Row extends CosTableRow> =
  // Use `ComponentType` with `ComponentProps` on `CosBasicTable<Row>` to
  // exclude the `Column` property added via `CosBasicTable.Column = CreateCosTableColumn()`.
  // `Omit` doesn't work here because it would prevent the return type from
  // being a valid JSX element.
  //
  // This ensures TypeScript can correctly infer the `row` type in column render functions
  // when no explicit column properties are provided (e.g., `<MyTable.Column>{(_, row) => ...}</MyTable.Column>`).
  //
  // Without this adjustment, TS would infer the row as`CosTableRow` instead of
  // the generic type specified by the user.
  ComponentType<ComponentProps<typeof CosBasicTable<Row>>> & {
    Column: ReturnType<typeof CreateCosTableColumn<Row>>
  }

// Function ensuring the table row type is assigned.
export const GetCosBasicTable = <
  Row extends CosTableRow,
>(): CosBasicTableWithColumn<Row> => {
  return CosBasicTable as unknown as CosBasicTableWithColumn<Row>
}
