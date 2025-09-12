import { GetFixpackUpdateProgressResponseDataProgressesInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type ProgressTableRow = CosTableRow &
  GetFixpackUpdateProgressResponseDataProgressesInner

export const toProgressTableRow = (
  node: GetFixpackUpdateProgressResponseDataProgressesInner,
): ProgressTableRow => ({
  ...node,
  id: node.host,
})
