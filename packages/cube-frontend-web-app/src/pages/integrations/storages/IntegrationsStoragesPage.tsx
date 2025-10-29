import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { ListIntegrationStoragesResponseDataInner } from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosIconText,
  GetCosBasicTable,
  type CosTableRow,
} from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import dayjs from 'dayjs'
import { upperFirst } from 'lodash'
import { useContext, useMemo } from 'react'
import { StorageRowActions } from './_components/StorageRowActions'
import { StorageTableActions } from './_components/StorageTableActions'

export type StorageRow = CosTableRow & ListIntegrationStoragesResponseDataInner

const StorageTable = GetCosBasicTable<StorageRow>()

const storageToRow = (
  storage: ListIntegrationStoragesResponseDataInner,
): StorageRow => ({
  id: storage.name,
  ...storage,
})

export const IntegrationsStoragesPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.listIntegrationStorages,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const rows = useMemo(() => data?.map(storageToRow) || [], [data])

  const renderStorageName = (name: string, row: StorageRow) => (
    <div className="flex items-center gap-x-2">
      <span>{name}</span>
      {row.isDefault && <CosIconText type="primary">default</CosIconText>}
    </div>
  )

  const renderUpdateTime = (updatedAt: string) =>
    dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')

  return (
    <CosGeneralPanel topic="Storages" rightSlot={<StorageTableActions />}>
      <StorageTable rows={rows} isLoading={isLoading}>
        <StorageTable.Column label="Storage" property="name" emphasize={true}>
          {renderStorageName}
        </StorageTable.Column>
        <StorageTable.Column label="Type" property="type">
          {upperFirst}
        </StorageTable.Column>
        <StorageTable.Column label="Vendor" property="vendor" />
        <StorageTable.Column label="Update Time" property="updatedAt">
          {renderUpdateTime}
        </StorageTable.Column>
        <StorageTable.Column label="Management IP" property="managementIp" />
        <StorageTable.Column>
          {(_, row) => <StorageRowActions row={row} />}
        </StorageTable.Column>
      </StorageTable>
    </CosGeneralPanel>
  )
}
