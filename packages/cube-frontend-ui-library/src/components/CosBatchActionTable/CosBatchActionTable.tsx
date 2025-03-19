import {
  CosBasicTable,
  CosBasicTableProps,
} from '../CosBasicTable/CosBasicTable'
import { CosTableRow } from '../CosBasicTable/cosTableUtils'
import { CreateCosTableColumn } from '../CosBasicTable/rendering/CosTableColumn'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'

export type CosBatchActionTableProps<Row extends CosTableRow> =
  CosBasicTableProps<Row> & {
    selectedRowIds: string[]
    onCheckChange: (rowId: string) => void
    onAllCheckChange: () => void
  }

/**
 * 1. Table Row (Table Body)
 * --- (1). A checkbox (or a radio button) should be included within the component.
 * --- (2). The checkboxes should reflect the `selectedRows` prop to indicate their checked state.
 * --- (3). The `onRowClick` handler will be used within the component to toggle the checkbox state.
 *
 * 2. Table Header
 * --- (1). Checkbox state management in the table header:
 * ------ a. Checked → All rows are selected.
 * ------ b. Unchecked → No rows are selected.
 * ------ c. Indeterminate → Some rows are selected.
 * --- (2). Clicking the checkbox in the table header should toggle between selecting and deselecting all rows.
 */
const CosBatchActionTable = <Row extends CosTableRow>(
  props: CosBatchActionTableProps<Row>,
) => {
  const {
    children,
    rows,
    selectedRowIds = [],
    onCheckChange,
    onAllCheckChange,
    ...restProps
  } = props

  const isRowSelected = (rowId: string) => selectedRowIds.includes(rowId)

  /** Return Table based on CosBasicTable */
  return (
    <CosBasicTable {...restProps} rows={rows}>
      <CosBasicTable.Column label="checkbox" property="id">
        {(id) => (
          <CosCheckbox
            checked={isRowSelected(id)}
            onChange={() => onCheckChange(id)}
          />
        )}
      </CosBasicTable.Column>
      {children}
    </CosBasicTable>
  )
}

type CosBatchActionTableWithColumn<Row extends CosTableRow> =
  typeof CosBatchActionTable<Row> & {
    Column: ReturnType<typeof CreateCosTableColumn<Row>>
  }

export const GetCosBatchActionTable = <
  Row extends CosTableRow,
>(): CosBatchActionTableWithColumn<Row> => {
  return CosBatchActionTable as CosBatchActionTableWithColumn<Row>
}
