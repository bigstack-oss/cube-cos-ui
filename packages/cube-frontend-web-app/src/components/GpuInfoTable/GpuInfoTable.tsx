import {
  Children,
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { CosLoadingSpinner } from '@cube-frontend/ui-library'
import {
  CHUNK_PLACEHOLDER_ROW_ID,
  InfoTableRow,
  isChunkPlaceholderRow,
  isInfoTableColumn,
} from './_components/infoTableUtils'
import {
  CreateInfoTableColumn,
  InfoTableColumnProps,
} from './_components/InfoTableColumn'

type GpuInfoTableProps<Row extends InfoTableRow> = PropsWithChildren<{
  scrollBehavior: 'horizontal' | 'vertical'
  isLoading?: boolean
  rows: Row[]
  maxRows?: number
  title: string
  className?: string
}>

const GpuInfoTable = <Row extends InfoTableRow>(
  props: GpuInfoTableProps<Row>,
) => {
  const {
    children,
    scrollBehavior,
    isLoading,
    rows,
    maxRows = 5,
    title,
    className,
  } = props
  const isVertical = scrollBehavior === 'vertical'

  const renderTitle = () => {
    return (
      <div className="primary-body4 font-semibold text-functional-text-light">
        {title}
      </div>
    )
  }

  const renderLoadingSpinner = () => {
    return (
      <div className="w-fit border border-functional-border-divider bg-primary-0 p-4">
        <div className="flex min-w-[400px] items-center justify-center">
          <CosLoadingSpinner variant="dot120" className="size-4" />
        </div>
      </div>
    )
  }

  const columns = useMemo(() => {
    return Children.toArray(children).filter(
      (
        child,
      ): child is ReactElement<InfoTableColumnProps<Row, keyof Row | never>> =>
        isInfoTableColumn<Row>(child),
    )
  }, [children])

  const renderCell = (
    row: Row,
    rowIndex: number,
    column: InfoTableColumnProps<Row, keyof Row | never>,
  ): ReactNode => {
    if (isChunkPlaceholderRow(row)) {
      return null
    }

    const { children: columnChildren, property } = column
    const propertyValue = property ? row[property] : undefined

    if (typeof columnChildren === 'function') {
      return columnChildren(
        propertyValue as typeof property extends keyof Row
          ? Row[keyof Row]
          : undefined,
        row,
        rowIndex,
      )
    }

    if (columnChildren !== undefined) return columnChildren

    return propertyValue?.toString()
  }

  const renderTable = (rows: Row[]) => {
    return (
      <table className="border-separate border-spacing-4">
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th
                key={columnIndex}
                className="secondary-body5 p-0 text-left font-semibold text-functional-text-light"
              >
                {columnIndex === 0 ? (
                  <span className="sr-only">{column.props.label}</span>
                ) : (
                  column.props.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={twMerge(
                    'primary-body5 p-0 text-left text-functional-text-light',
                    columnIndex === 0 && 'text-functional-text',
                  )}
                >
                  {renderCell(row, rowIndex, column.props)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const renderVerticalScrollTable = () => {
    return (
      <div className="flex w-fit flex-col gap-y-2">
        {renderTitle()}
        {isLoading ? (
          renderLoadingSpinner()
        ) : (
          <div
            className={twMerge(
              'border border-functional-border-divider bg-primary-0 p-4',
              className,
            )}
          >
            {renderTable(rows)}
          </div>
        )}
      </div>
    )
  }

  const renderHorizontalScrollTable = () => {
    const chunks: Row[][] = []
    for (let i = 0; i < rows.length; i += maxRows) {
      chunks.push(rows.slice(i, i + maxRows))
    }

    const lastChunk = chunks[chunks.length - 1]
    while (lastChunk && lastChunk.length < maxRows) {
      lastChunk.push({
        id: CHUNK_PLACEHOLDER_ROW_ID,
      } as Row)
    }

    return (
      <div className="flex w-full flex-col gap-y-2">
        {renderTitle()}
        {isLoading ? (
          renderLoadingSpinner()
        ) : (
          <div className="flex w-full gap-x-4 overflow-x-scroll border border-functional-border-divider bg-primary-0 p-4">
            {chunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="shrink-0">
                {renderTable(chunk)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return isVertical
    ? renderVerticalScrollTable()
    : renderHorizontalScrollTable()
}

GpuInfoTable.Column = CreateInfoTableColumn<InfoTableRow>()

type InfoTableWithColumn<Row extends InfoTableRow> = ComponentType<
  ComponentProps<typeof GpuInfoTable<Row>>
> & {
  Column: ReturnType<typeof CreateInfoTableColumn<Row>>
}

export const GetInfoTable = <
  Row extends InfoTableRow,
>(): InfoTableWithColumn<Row> => {
  return GpuInfoTable as unknown as InfoTableWithColumn<Row>
}
