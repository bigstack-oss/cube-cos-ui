import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosPagination, CosSearchBarFilter } from '@cube-frontend/ui-library'
import { TuningSpecTable } from './TuningSpecTable'
import { UseSpecFilter } from './useSpecFilter'
import { useSpecRows } from './useSpecRows'

type TuningSpecTableSectionProps = {
  isLoading: boolean
  specs: ListTuningSpecResponseDataInner[] | undefined
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  specFilter: UseSpecFilter
  onSpecSelect: (spec: ListTuningSpecResponseDataInner) => void
}

export const TuningSpecTableSection = (props: TuningSpecTableSectionProps) => {
  const { isLoading, specs, selectedSpec, specFilter, onSpecSelect } = props

  const {
    filter,
    onKeywordChange,
    onKeywordClear,
    onPageChange,
    onItemsPerPageChange,
  } = specFilter

  const { matchedRows, paginatedRows } = useSpecRows(specs, filter)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-[480px]">
        <CosSearchBarFilter
          placeholder="Search key or description"
          value={filter.keyword}
          isLoading={isLoading}
          showDropdown={false}
          onChange={onKeywordChange}
          onInputClear={onKeywordClear}
        />
      </div>
      <TuningSpecTable
        selectedSpec={selectedSpec}
        isLoading={isLoading}
        rows={paginatedRows}
        onRowClick={onSpecSelect}
      />
      <CosPagination
        isLoading={isLoading}
        totalItems={matchedRows.length}
        currentPage={filter.currentPage}
        itemsPerPage={filter.itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}
