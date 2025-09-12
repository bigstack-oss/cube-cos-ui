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
import dayjs from 'dayjs'
import { ChangeEvent, useContext, useMemo } from 'react'

type FixpackUpdatableNodesViewProps = {
  fixpack: ListFixpacksResponseDataFixpacksInner
  isRollbackDisclaimerRead: boolean
  isRollbackDisclaimerDisabled: boolean
  onRollbackDisclaimerReadChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const UpdatableNodeTable = GetCosBasicTable<UpdatableNodeRow>()

type UpdatableNodeRow = CosTableRow & ListFixpackUpdatableNodesResponseDataInner

const nodeToTableRow = (
  node: ListFixpackUpdatableNodesResponseDataInner,
): UpdatableNodeRow => ({
  ...node,
  id: node.name,
})

export const FixpackUpdatableNodesView = (
  props: FixpackUpdatableNodesViewProps,
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

  const rows = useMemo<UpdatableNodeRow[]>(
    () => (updatableNodes ?? []).map(nodeToTableRow),
    [updatableNodes],
  )

  const formatUpdatedAt = (updatedAt: string): string => {
    if (!updatedAt) return ''
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Do you want to install{' '}
        <b className="font-semibold">{fixpack.version}</b> on these nodes?
      </div>
      <UpdatableNodeTable isLoading={isLoading} rows={rows}>
        <UpdatableNodeTable.Column label="Host" property="name" />
        <UpdatableNodeTable.Column label="Last Updated" property="updatedAt">
          {formatUpdatedAt}
        </UpdatableNodeTable.Column>
        <UpdatableNodeTable.Column
          label="Firmware Version"
          property="version"
        />
      </UpdatableNodeTable>
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
