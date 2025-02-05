import {
  Children,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CosTableColumnProps } from './rendering/CosTableColumn'
import { CosTableRow, isCosTableColumn } from './cosTableUtils'
import { RowCompareFnMap } from './sorting/sortingUtils'

export type ColumnPayloads<Row extends CosTableRow> = {
  columns: CosTableColumnProps<Row>[]
  rowCompareFnMapRef: RefObject<RowCompareFnMap<Row>>
}

export const useColumnPayloads = <Row extends CosTableRow>(
  children: ReactNode,
): ColumnPayloads<Row> => {
  const [columns, setColumns] = useState<CosTableColumnProps<Row>[]>([])
  const rowCompareFnMapRef = useRef<RowCompareFnMap<Row>>({})

  useEffect(() => {
    const nextColumns: CosTableColumnProps<Row, keyof Row>[] = []
    const nextRowCompareFnMap: RowCompareFnMap<Row> = {}

    Children.toArray(children).forEach((child) => {
      if (!isCosTableColumn(child)) {
        console.warn(
          'The children of CosTable can only be CosTableColumn, but found: ',
          child,
        )
        return
      }

      const columnProps = child.props as CosTableColumnProps<Row>
      nextColumns.push(columnProps)

      const { property, sortingCompareFnMap } = columnProps

      if (property) {
        nextRowCompareFnMap[property] = sortingCompareFnMap
      }
    })

    setColumns(nextColumns)
    rowCompareFnMapRef.current = nextRowCompareFnMap
  }, [children])

  return {
    columns,
    rowCompareFnMapRef,
  }
}
