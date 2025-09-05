import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { cosTableStyles } from '../CosBasicTable/rendering/cosTableStyles'
import { CosDetailsTableRow } from './CosDetailsTableRow'

export type CosDetailsTableProps = {
  header: string
  children: ReactNode
}

export const CosDetailsTable = (props: CosDetailsTableProps) => {
  const { header, children } = props

  return (
    <div className="overflow-auto">
      <table className={cosTableStyles.table()}>
        <thead>
          <tr>
            <th
              className={twMerge(
                'rounded-t-[5px] bg-functional-text px-4 py-2',
                'secondary-body3 text-left font-semibold text-grey-0',
                'border-x border-t border-functional-border-divider',
              )}
              colSpan={2}
            >
              {header}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

CosDetailsTable.Row = CosDetailsTableRow
