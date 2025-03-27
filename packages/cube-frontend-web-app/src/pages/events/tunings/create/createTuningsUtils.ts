import { ListTuningSpecResponseDataInnerRolesInnerHostsInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type PreviewRow = CosTableRow & {
  host: HostWithRole
}

export type HostWithRole =
  ListTuningSpecResponseDataInnerRolesInnerHostsInner & {
    role: string
  }

export const hostToPreviewRow = (host: HostWithRole): PreviewRow => ({
  id: host.name,
  host,
})
