import { CosTableRow } from '../cosTableUtils'

export type SortingState<Row extends CosTableRow> = {
  property: keyof Row
  direction: SortDirection
}

export type SortDirectionMap<Row extends CosTableRow> = Partial<
  Record<keyof Row, SortDirection>
>

export type SortDirection = 'ascending' | 'descending' | undefined

export type RowCompareFnMap<Row extends CosTableRow> = {
  [Property in keyof Row]?: ColumnCompareFnMap<Row[Property]>
}

export type ColumnCompareFnMap<T> = Record<
  NonNullable<SortDirection>,
  CompareFn<T>
>

/**
 * Determines whether the two elements are sorted.
 */
export type CompareFn<T> = (preceding: T, following: T) => boolean

//          <----------------<----------------<
//          |                                 |
//          v                                 ^
// No sorting (undefined) -> descending -> ascending
export const computeNextSortDirection = (
  currentDirection: SortDirection | undefined,
): SortDirection => {
  if (currentDirection === undefined) {
    return 'descending'
  } else if (currentDirection === 'descending') {
    return 'ascending'
  } else {
    return undefined
  }
}
