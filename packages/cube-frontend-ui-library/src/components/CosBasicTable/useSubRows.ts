import { Children, ReactNode, useEffect, useState } from 'react'
import {
  CosTableRow,
  isCosTableColumn,
  isCosTableSubRow,
} from './cosTableUtils'
import { CosTableColumnProps } from './rendering/CosTableColumn'
import { CosTableSubRowProps } from './rendering/CosTableSubRow'

export type SubRow<ParentRow extends CosTableRow> = {
  columns: CosTableColumnProps<ParentRow, keyof ParentRow | never>[]
  props: CosTableSubRowProps<ParentRow>
}

export const useSubRows = <ParentRow extends CosTableRow>(
  tableChildren: ReactNode,
): SubRow<ParentRow>[] => {
  const [subRows, setSubRows] = useState<SubRow<ParentRow>[]>([])

  useEffect(() => {
    const nextSubRows: SubRow<ParentRow>[] = []

    Children.toArray(tableChildren).forEach((subRowNode) => {
      if (!isCosTableSubRow<ParentRow>(subRowNode)) return

      const subRowColumns: CosTableColumnProps<
        ParentRow,
        keyof ParentRow | never
      >[] = []

      Children.toArray(subRowNode.props.children).forEach((columnNode) => {
        if (!isCosTableColumn<ParentRow>(columnNode)) return

        const columnProps = columnNode.props as CosTableColumnProps<
          ParentRow,
          keyof ParentRow | never
        >
        subRowColumns.push(columnProps)
      })

      if (subRowColumns.length) {
        nextSubRows.push({
          columns: subRowColumns,
          props: subRowNode.props,
        })
      }
    })

    setSubRows(nextSubRows)
  }, [tableChildren])

  return subRows
}
