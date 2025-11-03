import {
  CosButton,
  CosGeneralPanel,
  CosIconText,
  CosLoadingSpinner,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import dayjs from 'dayjs'
import { upperFirst } from 'lodash'
import { StorageRowActions } from './_components/StorageRowActions'
import { StorageTableActions } from './_components/StorageTableActions'
import { useStorageTable } from './_components/useStorageTable'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import { DeleteConfirmModal } from './models/_components/DeleteConfirmModal'
import { StorageRow } from './storageUtils'

const StorageTable = GetCosBasicTable<StorageRow>()

export const IntegrationsStoragesPage = () => {
  const { rows, showLoading, rowActions } = useStorageTable()

  const renderStorageName = (name: string, row: StorageRow) => (
    <div className="flex items-center gap-x-2">
      <span>{name}</span>
      {row.isDefault && <CosIconText type="primary">default</CosIconText>}
      {row.rowStates.showProcessing && (
        <CosTooltip
          placement="top-left"
          hoverContent={{ message: row.rowStates.processingMessage }}
        >
          <div className="flex items-center justify-center">
            <CosLoadingSpinner variant="dot120" />
          </div>
        </CosTooltip>
      )}
    </div>
  )

  const renderUpdateTime = (updatedAt: string) =>
    dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')

  const renderVerifyColumn = (row: StorageRow) => {
    const verifyStates = row.rowStates.verify

    if (verifyStates.hidden) return null

    if (verifyStates.failed) {
      return (
        <div className="flex items-center gap-x-2 text-status-negative">
          <CrossFill className="icon-md-sm" />
          <span className="secondary-body3 font-semibold">Failed</span>
        </div>
      )
    }

    if (row.isVerified) {
      return (
        <div className="flex items-center gap-x-2 text-status-positive">
          <CheckmarkCircleFill className="icon-md-sm" />
          <span>Verified</span>
        </div>
      )
    }

    return (
      <CosButton
        type="secondary"
        size="md"
        usage="text-only"
        disabled={verifyStates.disabled}
        loading={verifyStates.loading}
        onClick={() => rowActions.verify(row)}
      >
        Verify
      </CosButton>
    )
  }

  return (
    <CosGeneralPanel topic="Storages" rightSlot={<StorageTableActions />}>
      <StorageTable rows={rows} isLoading={showLoading}>
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
        <StorageTable.Column label="Verify">
          {(_, row) => renderVerifyColumn(row)}
        </StorageTable.Column>
        <StorageTable.Column>
          {(_, row) => <StorageRowActions row={row} rowActions={rowActions} />}
        </StorageTable.Column>
      </StorageTable>
      <DeleteConfirmModal action={rowActions.delete} />
    </CosGeneralPanel>
  )
}
