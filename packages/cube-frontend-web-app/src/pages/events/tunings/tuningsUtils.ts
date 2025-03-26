import {
  ListTuningResponseDataTuningsInner,
  ListTuningResponseDataTuningsInnerHostsInner,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'

export type TuningRow = ListTuningResponseDataTuningsInner & CosTableRow

const getRowId = (): string => uniqueId('tuning')

export const tuningToRow = (
  tuning: ListTuningResponseDataTuningsInner,
): TuningRow => ({
  ...structuredClone(tuning),
  id: getRowId(),
})

export const maxHostsDisplayCount = 10

export const joinHostNames = (
  hosts: ListTuningResponseDataTuningsInnerHostsInner[] | undefined,
): string | undefined => {
  return hosts?.map((host) => host.name).join(',')
}
