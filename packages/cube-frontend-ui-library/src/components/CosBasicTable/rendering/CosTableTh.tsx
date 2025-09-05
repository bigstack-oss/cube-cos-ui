import { CosTableRow } from '../cosTableUtils'
import { SortingState } from '../sorting/sortingUtils'
import { CosTableColumnProps } from './CosTableColumn'
import { SortingArrow } from './SortingArrow'
import { cosTableStyles } from './cosTableStyles'

export type CosTableThProps<Row extends CosTableRow> = {
  column: CosTableColumnProps<Row, keyof Row | never>
  sortingState: SortingState<Row> | undefined
  onSortClick: () => void
  isTableEmpty?: boolean
}

export const CosTableTh = <Row extends CosTableRow>(
  props: CosTableThProps<Row>,
) => {
  const { column, sortingState, onSortClick, isTableEmpty = false } = props

  return (
    <th className={cosTableStyles.th({ isTableEmpty })}>
      <span className="flex items-center gap-x-2 whitespace-nowrap">
        {column.label}
        {column.isSortable && column.property && (
          <SortingArrow
            direction={
              sortingState?.property === column.property
                ? sortingState?.direction
                : undefined
            }
            onClick={onSortClick}
          />
        )}
      </span>
    </th>
  )
}
