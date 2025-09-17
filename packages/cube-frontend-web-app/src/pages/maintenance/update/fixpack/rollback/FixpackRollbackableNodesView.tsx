import {
  FixpacksApiListFixpackUpdatableNodesRequest,
  ListFixpackRollbackableNodesResponseDataInner,
  ListFixpacksResponseDataFixpacksInner,
} from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useMemo } from 'react'
import { formatUpdatedAt } from '../_components/fixpackUpdateUtils'

type FixpackRollbackableNodesViewProps = {
  fixpack: ListFixpacksResponseDataFixpacksInner
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
  const { fixpack } = props

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

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Do you want to rollback{' '}
        <b className="font-semibold">{fixpack.version}</b> on these nodes?
      </div>
      <RollbackableNodeTable isLoading={isLoading} rows={rows}>
        <RollbackableNodeTable.Column label="Host" property="name" />
        <RollbackableNodeTable.Column label="Last Updated" property="updatedAt">
          {formatUpdatedAt}
        </RollbackableNodeTable.Column>
      </RollbackableNodeTable>
    </div>
  )
}
