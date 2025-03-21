import { cva } from 'class-variance-authority'
import { CosTableRow } from '../cosTableUtils'
import { CosTableColumnProps } from './CosTableColumn'
import { CosTableTdSkeleton } from './CosTableTdSkeleton'

export type CosTableTdProps<Row extends CosTableRow> = {
  row?: Row
  rowIndex: number
  column: CosTableColumnProps<Row, keyof Row | never>
  isLoading?: boolean
}

const td = cva(
  [
    'primary-body4 px-4 py-2.5 text-functional-text',
    'border-b border-b-functional-border-divider bg-grey-0',
    'first-of-type:border-l last-of-type:border-r',
  ],
  {
    variants: {
      emphasize: {
        true: 'font-semibold',
      },
      fitContent: {
        /**
         * Workaround:
         * `w-0` is used to prevent the table cell from expanding.
         * `w-fit` doesn't work when target element is a table cell.
         **/
        true: 'w-0',
      },
    },
  },
)

export const CosTableTd = <Row extends CosTableRow>(
  props: CosTableTdProps<Row>,
) => {
  const { row, rowIndex, column, isLoading } = props

  const renderContent = () => {
    if (!row) {
      return undefined
    }

    const { children, property } = column

    const propertyValue = property ? row[property] : undefined

    if (typeof children === 'function') {
      return children(
        propertyValue as typeof property extends keyof Row
          ? Row[keyof Row]
          : undefined,
        row,
        rowIndex,
      )
    } else if (children) {
      return children
    }

    return propertyValue?.toString()
  }

  return (
    <td
      className={td({
        emphasize: column.emphasize,
        fitContent: column.fitContent,
      })}
    >
      {isLoading ? (
        <CosTableTdSkeleton variant={column.skeletonVariant ?? 'regular'} />
      ) : (
        renderContent()
      )}
    </td>
  )
}
