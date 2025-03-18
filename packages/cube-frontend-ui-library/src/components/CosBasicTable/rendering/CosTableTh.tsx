import { cva } from 'class-variance-authority'
import { CosTableRow } from '../cosTableUtils'
import { SortingState } from '../sorting/sortingUtils'
import { CosTableColumnProps } from './CosTableColumn'
import { SortingArrow } from './SortingArrow'

export type CosTableThProps<Row extends CosTableRow> = {
  column: CosTableColumnProps<Row>
  sortingState: SortingState<Row> | undefined
  onSortClick: () => void
  isTableEmpty?: boolean
}

const th = cva(
  [
    'secondary-body3 px-4 py-2 text-left text-functional-text-light',
    'border-y border-functional-border-divider bg-scene-background',
    'first-of-type:border-l last-of-type:border-r',
  ],
  {
    variants: {
      isTableEmpty: {
        true: 'first-of-type:rounded-l-[5px] last-of-type:rounded-r-[5px]',
        false: 'first-of-type:rounded-tl-[5px] last-of-type:rounded-tr-[5px]',
      },
    },
  },
)

export const CosTableTh = <Row extends CosTableRow>(
  props: CosTableThProps<Row>,
) => {
  const { column, sortingState, onSortClick, isTableEmpty = false } = props

  return (
    <th className={th({ isTableEmpty })}>
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
