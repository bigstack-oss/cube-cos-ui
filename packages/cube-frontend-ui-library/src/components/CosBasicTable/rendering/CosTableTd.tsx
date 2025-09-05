import { CosTableRow } from '../cosTableUtils'
import { CosTableColumnProps } from './CosTableColumn'
import { CosTableTdSkeleton } from './CosTableTdSkeleton'
import { cosTableStyles } from './cosTableStyles'

export type CosTableTdProps<Row extends CosTableRow> = {
  row?: Row
  rowIndex: number
  column: CosTableColumnProps<Row, keyof Row | never>
  isLoading?: boolean
}

export const CosTableTd = <Row extends CosTableRow>(
  props: CosTableTdProps<Row>,
) => {
  const { row, rowIndex, column, isLoading } = props

  const getEmphasize = (): boolean | undefined => {
    const { emphasize } = column
    if (emphasize === undefined || !row) {
      return undefined
    }
    if (typeof emphasize === 'function') {
      return emphasize(row)
    }
    return emphasize
  }

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
      className={cosTableStyles.td({
        emphasize: getEmphasize(),
        fitContent: column.fitContent,
      })}
      colSpan={column.colSpan}
    >
      {isLoading ? (
        <CosTableTdSkeleton variant={column.skeletonVariant ?? 'regular'} />
      ) : (
        renderContent()
      )}
    </td>
  )
}
