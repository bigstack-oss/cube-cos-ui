import { useContext, useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  FixpacksApiListFixpackUpdatableNodesRequest,
  ListFixpackRollbackableNodesResponseDataInner,
} from '@cube-frontend/api'
import {
  CosCheckbox,
  CosTableRow,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { formatUpdatedAt } from '../_components/fixpackUpdateUtils'
import { FixpackRow } from '../listFixpacksUtils'

type FixpackRollbackableNodesViewProps = {
  fixpack: FixpackRow
  selectedNodes: string[]
  onSelectedNodesChange: (nodes: string[]) => void
}

const RollbackableNodeTable = GetCosBasicTable<RollbackableNodeRow>()

type RollbackableNodeRow = CosTableRow &
  ListFixpackRollbackableNodesResponseDataInner

const nodeToTableRow = (
  node: ListFixpackRollbackableNodesResponseDataInner,
): RollbackableNodeRow => ({
  ...node,
  id: node.name,
})

export const FixpackRollbackableNodesView = (
  props: FixpackRollbackableNodesViewProps,
) => {
  const { fixpack, selectedNodes, onSelectedNodesChange } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: rollbackableNodes } = useCosGetRequest(
    fixpacksApi.listFixpackRollbackableNodes,
    (): FixpacksApiListFixpackUpdatableNodesRequest => ({
      dataCenter: dataCenter!.name,
      version: fixpack.version,
    }),
  )

  const rows = useMemo<RollbackableNodeRow[]>(
    () => (rollbackableNodes ?? []).map(nodeToTableRow),
    [rollbackableNodes],
  )

  // Pre-select every node whose latest fixpack is this one.
  useEffect(() => {
    if (!rollbackableNodes) return
    onSelectedNodesChange(rollbackableNodes.map((n) => n.name))
  }, [rollbackableNodes, onSelectedNodesChange])

  const toggleNode = (name: string, checked: boolean): void => {
    onSelectedNodesChange(
      checked
        ? [...selectedNodes, name]
        : selectedNodes.filter((n) => n !== name),
    )
  }

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.fixpack.rollbackModal.topMessage.confirmRollback"
          values={{ fixpack: fixpack.display }}
          components={{ bold: <b className="font-semibold" /> }}
        />
      </div>
      <RollbackableNodeTable isLoading={isLoading} rows={rows}>
        <RollbackableNodeTable.Column fitContent={true}>
          {(_, row) => (
            <CosCheckbox
              aria-label={row.name}
              checked={selectedNodes.includes(row.name)}
              onChange={(e) => toggleNode(row.name, e.target.checked)}
            />
          )}
        </RollbackableNodeTable.Column>
        <RollbackableNodeTable.Column
          label={t('maintenance.update.fixpack.rollbackModal.host')}
          property="name"
        />
        <RollbackableNodeTable.Column
          label={t('maintenance.update.fixpack.rollbackModal.lastUpdated')}
          property="updatedAt"
        >
          {formatUpdatedAt}
        </RollbackableNodeTable.Column>
      </RollbackableNodeTable>
    </div>
  )
}
