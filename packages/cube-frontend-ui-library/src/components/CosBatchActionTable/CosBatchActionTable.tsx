import { useMemo } from 'react'
import {
  CosBasicTable,
  CosBasicTableProps,
} from '../CosBasicTable/CosBasicTable'
import { CosBatchActionTableRow } from '../CosBasicTable/cosTableUtils'
import { CreateCosTableColumn } from '../CosBasicTable/rendering/CosTableColumn'
import { CosCheckbox } from '../CosCheckbox/CosCheckbox'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { useHeaderCheckboxStatus } from './useHeaderCheckboxStatus'

export type CosBatchActionTableProps<Row extends CosBatchActionTableRow> =
  CosBasicTableProps<Row> & {
    selectedRowIds: string[]
    disabledRowIds?: string[]
    onCheckChange: (rowId: string) => void
  } & (
      | {
          showHeaderCheckbox: true
          onAllCheckChange: (checked: boolean) => void
        }
      | { showHeaderCheckbox: false }
    )

const CosBatchActionTable = <Row extends CosBatchActionTableRow>(
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

  const selectedRowSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds],
  )

  const disabledRowSet = useMemo(
    () => new Set(disabledRowIds),
    [disabledRowIds],
  )

  const convertedRows: Row[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        checked: selectedRowSet.has(row.id),
        disabled: disabledRowSet.has(row.id),
      })),
    [rows, disabledRowSet, selectedRowSet],
  )

  const checkboxStatus = useHeaderCheckboxStatus(convertedRows, selectedRowIds)

  const renderHeaderCheckbox = () => {
    if (!showHeaderCheckbox) return null

    const { onAllCheckChange, isLoading } = props

    if (isLoading) return <CosSkeleton className="size-4 rounded-[3px]" />

    return (
      <CosCheckbox
        checked={checkboxStatus}
        onChange={(e) => onAllCheckChange(e.target.checked)}
      />
    )
  }

  return (
    <CosBasicTable
      {...restProps}
      rows={convertedRows}
      selectedRowSet={selectedRowSet}
      disabledRowSet={disabledRowSet}
    >
      <CosBasicTable.Column label={renderHeaderCheckbox()}>
        {(_, row: CosBatchActionTableRow) => {
          if (row.disabled) return null

          return (
            <CosCheckbox
              checked={row.checked}
              onChange={() => onCheckChange(row.id)}
            />
          )
        }}
      </CosBasicTable.Column>
      {children}
    </CosBasicTable>
  )
}

CosBatchActionTable.Column = CosBasicTable.Column

type CosBatchActionTableWithColumn<Row extends CosBatchActionTableRow> =
  typeof CosBatchActionTable<Row> & {
    Column: ReturnType<typeof CreateCosTableColumn<Row>>
  }

export const GetCosBatchActionTable = <
  Row extends CosBatchActionTableRow,
>(): CosBatchActionTableWithColumn<Row> => {
  return CosBatchActionTable as CosBatchActionTableWithColumn<Row>
}
