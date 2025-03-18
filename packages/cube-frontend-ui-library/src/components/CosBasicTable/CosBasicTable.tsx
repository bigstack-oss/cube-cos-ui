import { PropsWithChildren, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  computeRowClassName,
  CosTableRow,
  RowClassNameProp,
} from './cosTableUtils'
import { CreateCosTableColumn } from './rendering/CosTableColumn'
import { CosTableTd } from './rendering/CosTableTd'
import { CosTableTdEmpty } from './rendering/CosTableTdEmpty'
import { CosTableTh } from './rendering/CosTableTh'
import { SortingState } from './sorting/sortingUtils'
import { useSortedRows } from './sorting/useSortedRows'
import { useColumnPayloads } from './useColumnPayloads'

const tdBorderRadiusClass = twMerge(
  '[&:last-of-type>td:first-of-type]:rounded-bl-[5px]',
  '[&:last-of-type>td:last-of-type]:rounded-br-[5px]',
)

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

const CosBasicTable = <Row extends CosTableRow>(
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
    return skeletonIndexes.map((index) => (
      <tr key={index} className={tdBorderRadiusClass}>
        {columns.map((column, colIndex) => (
          <CosTableTd
            key={column.property?.toString() ?? colIndex}
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

    return sortedRows.map((row) => (
      <tr
        key={row.id}
        className={twMerge(
          '[&>td]:hover:bg-functional-hover-grey',
          tdBorderRadiusClass,
          computeRowClassName(rowClassName, row),
        )}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map((column, colIndex) => (
          <CosTableTd
            key={column.property?.toString() ?? colIndex}
            row={row}
            column={column}
          />
        ))}
      </tr>
    ))
  }

  return (
    <div className="overflow-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <CosTableTh
                key={column.property?.toString() ?? index}
                column={column}
                sortingState={sortingState}
                onSortClick={() => onSortDirectionChange(column.property!)}
                isEmpty={sortedRows.length === 0}
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
  typeof CosBasicTable<Row> & {
    Column: ReturnType<typeof CreateCosTableColumn<Row>>
  }

// Function ensuring the table row type is assigned.
export const GetCosBasicTable = <
  Row extends CosTableRow,
>(): CosBasicTableWithColumn<Row> => {
  return CosBasicTable as CosBasicTableWithColumn<Row>
}
