import {
  GetFixpackUpdateProgressResponseDataProgressesInner,
  ListFixpacksResponseDataFixpacksInner,
  GetFixpackUpdateProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import dayjs from 'dayjs'

export type ProgressTableRow = CosTableRow &
  GetFixpackUpdateProgressResponseDataProgressesInner

export const toProgressTableRow = (
  node: GetFixpackUpdateProgressResponseDataProgressesInner,
): ProgressTableRow => ({
  ...node,
  id: node.host,
})

export const formatUpdatedAt = (updatedAt: string): string => {
  if (!updatedAt) return ''
  return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
}

export const getIsSoftRebooting = (
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  progressRows: ProgressTableRow[],
): boolean => {
  return (
    !!fixpack?.rebootRequired &&
    progressRows.length > 0 &&
    progressRows.some((row) => row.status.current === ProgressStatus.Rebooting)
  )
}

export const getIsReadyToReboot = (
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined,
  progressRows: ProgressTableRow[],
): boolean => {
  return (
    !!fixpack?.rebootRequired &&
    progressRows.length > 0 &&
    progressRows.every(
      (row) => row.status.current === ProgressStatus.WaitingReboot,
    )
  )
}

export const getShowRebootHint = (
  fixpack: ListFixpacksResponseDataFixpacksInner,
  progressRows: ProgressTableRow[],
): boolean => {
  return (
    fixpack.rebootRequired &&
    progressRows.some(
      (row) =>
        row.status.current === ProgressStatus.WaitingReboot ||
        row.status.current === ProgressStatus.Rebooting,
    )
  )
}
