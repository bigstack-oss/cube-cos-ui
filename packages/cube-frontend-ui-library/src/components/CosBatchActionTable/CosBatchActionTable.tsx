import { useCallback, useMemo } from 'react'
import {
  CosBasicTable,
  CosBasicTableProps,
} from '../CosBasicTable/CosBasicTable'
import { CosTableRow } from '../CosBasicTable/cosTableUtils'
import { CreateCosTableColumn } from '../CosBasicTable/rendering/CosTableColumn'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { useCheckboxStatus } from './useCheckboxStatus'

export type CosBatchActionTableProps<Row extends CosTableRow> =
  CosBasicTableProps<Row> & {
    selectedRowIds: string[]
    disabledRowIds?: string[]
    onCheckChange: (rowId: string) => void
  } & (
      | {
          showHeaderCheckbox: true
          onAllCheckChange: () => void
        }
      | { showHeaderCheckbox: false }
    )

const CosBatchActionTable = <Row extends CosTableRow>(
  props: CosBatchActionTableProps<Row>,
) => {
  const {
    children,
    rows,
    selectedRowIds,
    disabledRowIds = [],
    onCheckChange,
    showHeaderCheckbox,
    ...restProps
  } = props

  const isRowSelected = useCallback(
    (rowId: string) => selectedRowIds.includes(rowId),
    [selectedRowIds],
  )
  const isRowDisabled = useCallback(
    (rowId: string) => disabledRowIds.includes(rowId),
    [disabledRowIds],
  )

  const convertedRows: Row[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        checked: isRowSelected(row.id),
        disabled: isRowDisabled(row.id),
      })),
    [isRowDisabled, isRowSelected, rows],
  )

  const checkboxStatus = useCheckboxStatus(convertedRows, selectedRowIds)

  const renderHeaderCheckbox = () => {
    if (!showHeaderCheckbox) return null

    const { onAllCheckChange, isLoading } = props

    if (isLoading) return <CosSkeleton className="size-4 rounded-[3px]" />

    return (
      <CosCheckbox
        checked={checkboxStatus}
        onChange={() => onAllCheckChange()}
      />
    )
  }

  return (
    <CosBasicTable {...restProps} rows={convertedRows}>
      <CosBasicTable.Column label={renderHeaderCheckbox()} property="id">
        {(id) => {
          if (isRowDisabled(id)) return null

          return (
            <CosCheckbox
              checked={isRowSelected(id)}
              onChange={() => onCheckChange(id)}
            />
          )
        }}
      </CosBasicTable.Column>
      {children}
    </CosBasicTable>
  )
}

CosBatchActionTable.Column = CosBasicTable.Column

type CosBatchActionTableWithColumn<Row extends CosTableRow> =
  typeof CosBatchActionTable<Row> & {
    Column: ReturnType<typeof CreateCosTableColumn<Row>>
  }

export const GetCosBatchActionTable = <
  Row extends CosTableRow,
>(): CosBatchActionTableWithColumn<Row> => {
  return CosBatchActionTable as CosBatchActionTableWithColumn<Row>
}
