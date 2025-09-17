import {
  FixpacksApiListFixpackUpdatableNodesRequest,
  ListFixpacksResponseDataFixpacksInner,
  ListFixpackUpdatableNodesResponseDataInner,
} from '@cube-frontend/api'
import {
  CosCheckbox,
  CosTableRow,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ChangeEvent, useContext, useMemo } from 'react'
import { formatUpdatedAt } from '../_components/fixpackUpdateUtils'

type FixpackInstallableNodesViewProps = {
  fixpack: ListFixpacksResponseDataFixpacksInner
  isRollbackDisclaimerRead: boolean
  isRollbackDisclaimerDisabled: boolean
  onRollbackDisclaimerReadChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InstallableNodeTable = GetCosBasicTable<InstallableNodeRow>()

type InstallableNodeRow = CosTableRow &
  ListFixpackUpdatableNodesResponseDataInner

const nodeToTableRow = (
  node: ListFixpackUpdatableNodesResponseDataInner,
): InstallableNodeRow => ({
  ...node,
  id: node.name,
})

export const FixpackInstallableNodesView = (
  props: FixpackInstallableNodesViewProps,
) => {
  const {
    fixpack,
    isRollbackDisclaimerRead,
    isRollbackDisclaimerDisabled,
    onRollbackDisclaimerReadChange,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: updatableNodes } = useCosGetRequest(
    fixpacksApi.listFixpackUpdatableNodes,
    (): FixpacksApiListFixpackUpdatableNodesRequest => ({
      dataCenter: dataCenter!.name,
      version: fixpack.version,
    }),
  )

  const rows = useMemo<InstallableNodeRow[]>(
    () => (updatableNodes ?? []).map(nodeToTableRow),
    [updatableNodes],
  )
  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Do you want to install{' '}
        <b className="font-semibold">{fixpack.version}</b> on these nodes?
      </div>
      <InstallableNodeTable isLoading={isLoading} rows={rows}>
        <InstallableNodeTable.Column label="Host" property="name" />
        <InstallableNodeTable.Column label="Last Updated" property="updatedAt">
          {formatUpdatedAt}
        </InstallableNodeTable.Column>
        <InstallableNodeTable.Column
          label="Firmware Version"
          property="version"
        />
      </InstallableNodeTable>
      {!fixpack.status.isRollbackable && (
        <CosCheckbox
          labelClassName="max-w-none"
          label="*I understand that this fixpack cannot be rolled back, and installing it will also prevent rolling back to earlier versions."
          checked={isRollbackDisclaimerRead}
          disabled={isRollbackDisclaimerDisabled}
          onChange={onRollbackDisclaimerReadChange}
        />
      )}
    </div>
  )
}
