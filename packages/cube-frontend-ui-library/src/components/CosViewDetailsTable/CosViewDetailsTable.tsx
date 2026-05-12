import ChevronDown from '@cube-frontend/ui-library/icons/monochrome/chevron_down.svg?react'
import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import {
  CosBasicTable,
  CosBasicTableProps,
  GetCosBasicTable,
} from '../CosBasicTable/CosBasicTable'
import {
  CosTableRow,
  CosViewDetailsTableDetailItem,
} from '../CosBasicTable/cosTableUtils'
import { CreateCosTableColumn } from '../CosBasicTable/rendering/CosTableColumn'
import { CosTableSubRow } from '../CosBasicTable/rendering/CosTableSubRow'
import { DetailCell } from './DetailCell/DetailCell'
import { useColumnCount } from './useColumnCount'
import { CustomizedDetailCell } from './DetailCell/CustomizedDetailCell'

export type CosViewDetailsTableProps<ParentRow extends CosTableRow> = Omit<
  CosBasicTableProps<ParentRow> & {
    expandedRowIdSet: Set<string>
    onExpandChange: (parentRowId: string, value: boolean) => void
    detailTitle?: string | ((parentRow: ParentRow) => string)
    getDetailItems?: (parentRow: ParentRow) => CosViewDetailsTableDetailItem[]
    getCustomizedDetailCell?: (parentRow: ParentRow) => ReactNode
    beforeExpandButton?: (parentRow: ParentRow) => ReactNode
    isRowExpandDisabled?: (row: ParentRow) => boolean
  },
  'rowClassName'
>

const expandButton = cva('transition-transform', {
  variants: {
    isExpanded: {
      true: 'rotate-180',
      false: 'rotate-0',
    },
    disabled: {
      true: 'cursor-not-allowed text-functional-border-divider',
      false: 'text-functional-text',
    },
  },
})

const CosViewDetailsTable = <ParentRow extends CosTableRow>(
  props: CosViewDetailsTableProps<ParentRow>,
) => {
  const {
    children,
    expandedRowIdSet,
    onExpandChange: onExpandChangeProp,
    detailTitle,
    getDetailItems,
    getCustomizedDetailCell,
    beforeExpandButton,
    isRowExpandDisabled,
    ...restProps
  } = props

  const TypedBasicTable = GetCosBasicTable<ParentRow>()

  const columnCount = useColumnCount(children)

  const isExpanded = (parentRowId: string): boolean => {
    return expandedRowIdSet.has(parentRowId)
  }

  const onExpandChange = (parentRowId: string): void => {
    const value = !expandedRowIdSet.has(parentRowId)
    onExpandChangeProp(parentRowId, value)
  }

  const computeParentRowClassName = (row: ParentRow): ClassNameValue => {
    if (isExpanded(row.id)) {
      return twMerge(
        '[&>td]:bg-functional-hover-secondary',
        '[&>td]:hover:bg-functional-hover-secondary',
      )
    }
    return undefined
  }

  const computeSubRowClassName = (parentRow: ParentRow): ClassNameValue => {
    if (isExpanded(parentRow.id)) {
      return twMerge(
        '[&>td]:bg-scene-background',
        '[&>td]:hover:bg-scene-background',
      )
    }
    // Hide the border of sub-rows when collapsed because it's still visible
    // even when `max-height` is 0.
    return twMerge('[&>td]:border-none')
  }

  const computeDetailTitle = (parentRow: ParentRow): string | undefined => {
    if (typeof detailTitle === 'function') {
      return detailTitle(parentRow)
    }
    return detailTitle
  }

  const renderDetailCells = (row: ParentRow) => {
    if ('getDetailItems' in props && 'getDetailCells' in props) {
      console.warn(
        'Props "getDetailItems" and "getDetailCells" cannot be used at the same time. Please choose one.',
      )
    }

    if (getDetailItems) {
      return (
        <DetailCell
          isExpanded={isExpanded(row.id)}
          title={computeDetailTitle(row)}
          items={getDetailItems(row)}
        />
      )
    }

    if (getCustomizedDetailCell) {
      return (
        <CustomizedDetailCell
          isExpanded={isExpanded(row.id)}
          children={getCustomizedDetailCell(row)}
        />
      )
    }

    console.warn(
      'One of the props "getDetailItems" and "getDetailCells" must be provided.',
    )

    return null
  }

  const renderExpandButton = (parentRow: ParentRow) => {
    const disabled = isRowExpandDisabled?.(parentRow) ?? false
    return (
      <div className="flex items-center">
        {beforeExpandButton?.(parentRow)}
        <button
          type="button"
          className={expandButton({
            isExpanded: isExpanded(parentRow.id),
            disabled,
          })}
          onClick={() => onExpandChange(parentRow.id)}
          disabled={disabled}
        >
          <ChevronDown className="icon-md" />
        </button>
      </div>
    )
  }

  return (
    <TypedBasicTable {...restProps} rowClassName={computeParentRowClassName}>
      <TypedBasicTable.Column skeletonVariant="icon-only" fitContent={true}>
        {(_, parentRow) => renderExpandButton(parentRow)}
      </TypedBasicTable.Column>
      {children}
      <CosTableSubRow
        className={computeSubRowClassName}
        isVisible={(row) => isExpanded(row.id)}
      >
        {/* Placeholder column for the expand button. */}
        <TypedBasicTable.Column />
        {/* Details column. */}
        <TypedBasicTable.Column colSpan={columnCount}>
          {(_, row) => renderDetailCells(row)}
        </TypedBasicTable.Column>
      </CosTableSubRow>
    </TypedBasicTable>
  )
}

CosViewDetailsTable.Column = CosBasicTable.Column

type CosViewDetailsTableWithColumn<ParentRow extends CosTableRow> =
  typeof CosViewDetailsTable<ParentRow> & {
    Column: ReturnType<typeof CreateCosTableColumn<ParentRow>>
  }

export const GetCosViewDetailsTable = <
  ParentRow extends CosTableRow,
>(): CosViewDetailsTableWithColumn<ParentRow> => {
  return CosViewDetailsTable as CosViewDetailsTableWithColumn<ParentRow>
}
