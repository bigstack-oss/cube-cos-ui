import { ListFixpackNodeStatusResponseDataInner } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type NodeStatusRow = CosTableRow & ListFixpackNodeStatusResponseDataInner

const NodeStatusTable = GetCosBasicTable<NodeStatusRow>()

type NodeFixpackStatusTableProps = {
  isLoading: boolean
  nodeStatuses: ListFixpackNodeStatusResponseDataInner[]
}

export const NodeFixpackStatusTable = (props: NodeFixpackStatusTableProps) => {
  const { isLoading, nodeStatuses } = props

  const { t } = useTranslation()

  const rows = useMemo<NodeStatusRow[]>(
    () => nodeStatuses.map((n) => ({ ...n, id: n.name })),
    [nodeStatuses],
  )

  // hex_sdk reports `ok`, `missing <versions>` or `unreachable`
  const formatStatus = (status: string): string => {
    if (status === 'ok') return t('maintenance.update.fixpack.nodeStatus.ok')
    if (status === 'unreachable')
      return t('maintenance.update.fixpack.nodeStatus.unreachable')
    if (status.startsWith('missing'))
      return t('maintenance.update.fixpack.nodeStatus.missing', {
        fixpacks: status.replace(/^missing\s*/, ''),
      })
    return status
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h5 className="primary-h5 text-functional-text">
        {t('maintenance.update.fixpack.nodeStatus.title')}
      </h5>
      <NodeStatusTable rows={rows} isLoading={isLoading}>
        <NodeStatusTable.Column
          label={t('maintenance.update.fixpack.nodeStatus.node')}
          property="name"
          fitContent={true}
          emphasize={true}
        >
          {(name: string) => <div className="whitespace-nowrap">{name}</div>}
        </NodeStatusTable.Column>
        <NodeStatusTable.Column
          label={t('maintenance.update.fixpack.nodeStatus.installed')}
          property="installed"
        >
          {(installed: string[]) =>
            installed.length > 0
              ? installed.join(', ')
              : t('maintenance.update.fixpack.nodeStatus.none')
          }
        </NodeStatusTable.Column>
        <NodeStatusTable.Column
          label={t('maintenance.update.fixpack.nodeStatus.status')}
          property="status"
        >
          {formatStatus}
        </NodeStatusTable.Column>
      </NodeStatusTable>
    </div>
  )
}
