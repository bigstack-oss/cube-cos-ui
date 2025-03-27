import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { useMemo } from 'react'
import { SpecFilterValue } from './useSpecFilter'

type UseSpecRows = {
  matchedRows: SpecRow[]
  paginatedRows: SpecRow[]
}

export type SpecRow = ListTuningSpecResponseDataInner & CosTableRow

const specToRow = (spec: ListTuningSpecResponseDataInner): SpecRow => ({
  ...spec,
  id: uniqueId('tuning-spec'),
})

export const useSpecRows = (
  specs: ListTuningSpecResponseDataInner[] | undefined,
  filter: SpecFilterValue,
): UseSpecRows => {
  const { keyword, currentPage, itemsPerPage } = filter

  const matchedRows = useMemo<SpecRow[]>(() => {
    let matchedSpecs = specs ?? []
    const loweredKeyword = keyword.toLowerCase()

    if (loweredKeyword) {
      matchedSpecs = matchedSpecs.filter(
        (spec) =>
          spec.name.toLowerCase().includes(loweredKeyword) ||
          spec.description.toLocaleLowerCase().includes(loweredKeyword),
      )
    }

    return matchedSpecs.map(specToRow)
  }, [specs, keyword])

  const paginatedRows = useMemo<SpecRow[]>(() => {
    const start = (currentPage - 1) * itemsPerPage
    return matchedRows.slice(start, start + itemsPerPage)
  }, [matchedRows, currentPage, itemsPerPage])

  return {
    matchedRows,
    paginatedRows,
  }
}
