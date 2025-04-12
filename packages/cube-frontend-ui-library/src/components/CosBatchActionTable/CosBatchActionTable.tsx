import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  CosBasicTable,
  CosBasicTableProps,
  GetCosBasicTable,
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
    onCheckChange: (rowId: string, checked: boolean) => void
  } & (
      | {
          showHeaderCheckbox: true
          onAllCheckChange: (checked: boolean) => void
        }
      | { showHeaderCheckbox: false }
    )

const tableRow = cva(undefined, {
  variants: {
    isChecked: {
      true: '[&>td]:bg-functional-hover-secondary [&>td]:hover:bg-[#ECF1FF]',
    },
    isDisabled: {
      true: [
        '[&>td]:bg-white [&>td]:hover:bg-white',
        '[&>td]:text-functional-disable-text',
      ],
    },
  },
})

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

  const TypedBasicTable = GetCosBasicTable<Row>()

  const selectedRowIdSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds],
  )

  const disabledRowIdSet = useMemo(
    () => new Set(disabledRowIds),
    [disabledRowIds],
  )

  const convertedRows: Row[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        checked: selectedRowIdSet.has(row.id),
        disabled: disabledRowIdSet.has(row.id),
      })),
    [rows, selectedRowIdSet, disabledRowIdSet],
  )

  const checkboxStatus = useHeaderCheckboxStatus(
    convertedRows,
    selectedRowIdSet,
  )

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
    <TypedBasicTable
      {...restProps}
      rows={convertedRows}
      rowClassName={(row) =>
        twMerge(
          tableRow({
            isChecked: selectedRowIdSet?.has(row.id),
            isDisabled: disabledRowIdSet?.has(row.id),
          }),
        )
      }
    >
      <TypedBasicTable.Column label={renderHeaderCheckbox()}>
        {(_, row) => {
          if (row.disabled) return null

          return (
            <CosCheckbox
              checked={row.checked}
              onChange={(e) => onCheckChange(row.id, e.target.checked)}
            />
          )
        }}
      </TypedBasicTable.Column>
      {children}
    </TypedBasicTable>
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
