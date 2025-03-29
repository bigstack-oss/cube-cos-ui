import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'
import CheckmarkBold from '@cube-frontend/ui-library/icons/monochrome/checkmark_bold.svg?react'
import { cva } from 'class-variance-authority'
import { formatLimitation } from './formatLimitation'
import { SpecRow } from './useSpecRows'

type TuningSpecTableProps = {
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  isLoading: boolean
  rows: SpecRow[]
  onRowClick: (row: SpecRow) => void
}

const SpecTable = GetCosBasicTable<SpecRow>()

const checkmark = cva('icon-md', {
  variants: {
    isSelected: {
      true: '',
      false: 'invisible',
    },
  },
})

export const TuningSpecTable = (props: TuningSpecTableProps) => {
  const { selectedSpec, isLoading, rows, onRowClick } = props

  return (
    <SpecTable
      isLoading={isLoading}
      rows={rows}
      rowClassName="cursor-pointer"
      skeletonRowCount={10}
      onRowClick={onRowClick}
    >
      <SpecTable.Column fitContent={true}>
        {(_, row) => (
          <CheckmarkBold
            className={checkmark({
              isSelected: selectedSpec?.name === row.name,
            })}
          />
        )}
      </SpecTable.Column>
      <SpecTable.Column
        label="Key"
        property="name"
        emphasize={(row) => row.name === selectedSpec?.name}
      />
      <SpecTable.Column label="Default Value" property="limitation">
        {(limitation) => limitation.default.toString()}
      </SpecTable.Column>
      <SpecTable.Column label="Limitation" property="limitation">
        {(limitation) => formatLimitation(limitation)}
      </SpecTable.Column>
      <SpecTable.Column label="Description" property="description" />
    </SpecTable>
  )
}
