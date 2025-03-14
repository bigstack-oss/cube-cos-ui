import { RefObject, useEffect, useMemo, useState } from 'react'
import { CosTableRow } from '../cosTableUtils'
import { CosTableColumnProps } from '../rendering/CosTableColumn'
import { ascendingCompare, descendingCompare } from './sortingCompareFunctions'
import {
  computeNextSortDirection,
  RowCompareFnMap,
  SortDirection,
  SortingState,
} from './sortingUtils'

export type UseSortedRows<Row extends CosTableRow> = {
  sortedRows: Row[]
  sortingState: SortingState<Row> | undefined
  onSortDirectionChange: (property: keyof Row) => void
}

export const useSortedRows = <Row extends CosTableRow>(
  rows: Row[],
  columns: CosTableColumnProps<Row, keyof Row | never>[],
  defaultSortingState: SortingState<Row> | undefined,
  rowCompareFnMapRef: RefObject<RowCompareFnMap<Row>>,
): UseSortedRows<Row> => {
  const [sortingState, setSortingState] = useState<
    SortingState<Row> | undefined
  >(defaultSortingState)

  useEffect(() => {
    const { property } = sortingState ?? {}
    if (!property) {
      return
    }

    const sortedColumn = columns.find((column) => column.property === property)
    if (!sortedColumn) {
      // This should not happen.
      return
    } else if (!sortedColumn.isSortable) {
      console.warn(
        `Column with property ${property.toString()} is sorted, but its isSortable prop is falsy. ` +
          'Please set isSortable to true to enable sorting arrow.',
      )
    }
  }, [sortingState, columns])

  const sortedRows = useMemo(() => {
    const { property, direction } = sortingState ?? {}

    if (!property || !direction) {
      return rows
    }

    return structuredClone(rows).sort((rowA, rowB) => {
      const [preceding, following] = [rowA[property], rowB[property]]
      const customCompareFn = rowCompareFnMapRef.current[property]?.[direction]

      let isSorted = false

      if (direction === 'ascending') {
        isSorted = ascendingCompare(
          preceding,
          following,
          property.toString(),
          customCompareFn,
        )
      } else if (direction === 'descending') {
        isSorted = descendingCompare(
          preceding,
          following,
          property.toString(),
          customCompareFn,
        )
      } else {
        throw new Error(`Unhandled sort direction ${direction}`)
      }

      return isSorted ? -1 : 1
    })
  }, [rows, sortingState, rowCompareFnMapRef])

  const onSortDirectionChange = (property: keyof Row) => {
    let nextDirection: SortDirection

    if (sortingState?.property === property) {
      nextDirection = computeNextSortDirection(sortingState?.direction)
    } else {
      nextDirection = computeNextSortDirection(undefined)
    }

    setSortingState({
      property,
      direction: nextDirection,
    })
  }

  return {
    sortedRows,
    sortingState,
    onSortDirectionChange,
  }
}
