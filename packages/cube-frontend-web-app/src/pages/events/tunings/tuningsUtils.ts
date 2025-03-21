import { ListTuningResponseDataTuningsInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'

export type TuningRow = ListTuningResponseDataTuningsInner &
  CosTableRow & {
    isResetting: boolean
  }

const getRowId = (): string => uniqueId('tuning')

export const tuningToRow = (
  tuning: ListTuningResponseDataTuningsInner,
): TuningRow => ({
  ...structuredClone(tuning),
  id: getRowId(),
  isResetting: false,
})

export const maxHostsDisplayCount = 10

export const joinHosts = (hosts: string[] | undefined): string | undefined => {
  return hosts?.join(',')
}
