import { CosHyperlink } from '@cube-frontend/ui-library'
import { joinHostNames, maxHostsDisplayCount } from './utils'

export type HostPreviewTableCellProps = {
  hostNames: string[]
  onShowAllClick: () => void
}

export const HostPreviewTableCell = (props: HostPreviewTableCellProps) => {
  const { hostNames, onShowAllClick } = props

  const previewHosts = joinHostNames(hostNames.slice(0, maxHostsDisplayCount))

  if (hostNames.length > maxHostsDisplayCount) {
    return (
      <>
        {`${previewHosts},`}
        <CosHyperlink variant="text-only" onClick={onShowAllClick}>
          [...]
        </CosHyperlink>
      </>
    )
  }
  return previewHosts
}
