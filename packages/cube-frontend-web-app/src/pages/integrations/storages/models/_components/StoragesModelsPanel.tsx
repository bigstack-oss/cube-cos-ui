import {
  CosButton,
  CosGeneralPanel,
  CosLoadingSpinner,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { useStorageModelTable } from './StoragesModelsTable/useStorageModelTable'
import { RowActions } from './StoragesModelsTable/RowActions'
import { TableActions } from './StoragesModelsTable/TableActions'
import { ViewModal } from './StoragesModelsTable/ViewModal'
import { RemoveConfirmModal } from './StoragesModelsTable/RemoveConfirmModal'
import { StorageModelRow } from '../storagesModelsPageUtils'
import { ReplaceConfirmModal } from './StoragesModelsTable/ReplaceConfirmModal'

const StorageModelsTable = GetCosBasicTable<StorageModelRow>()

export const StoragesModelsPanel = () => {
  const { rows, showLoading, tableActions, rowActions } = useStorageModelTable()

  return (
    <CosGeneralPanel
      topic="Imported Model List"
      rightSlot={<TableActions actions={tableActions} />}
    >
      <StorageModelsTable rows={rows} isLoading={showLoading}>
        <StorageModelsTable.Column
          label="Vendor"
          property="vendor"
          emphasize
          fitContent
        >
          {(vendor, row) => (
            <div className="flex items-center gap-x-2">
              <span className="whitespace-nowrap">{vendor}</span>
              {row.state.isProcessing && <CosLoadingSpinner variant="dot120" />}
            </div>
          )}
        </StorageModelsTable.Column>
        <StorageModelsTable.Column label="Name" property="driver" fitContent>
          {(driver) => <span className="whitespace-nowrap">{driver}</span>}
        </StorageModelsTable.Column>
        <StorageModelsTable.Column>
          {(_, row) => (
            <CosButton
              type="ghost"
              onClick={() => rowActions.view.openModal(row)}
              disabled={row.state.isProcessing}
            >
              View more
            </CosButton>
          )}
        </StorageModelsTable.Column>
        <StorageModelsTable.Column>
          {(_, row) => (
            <RowActions
              row={row}
              onReplace={rowActions.replace.openConfirmModal}
              onRemove={rowActions.remove.openConfirmModal}
            />
          )}
        </StorageModelsTable.Column>
      </StorageModelsTable>
      <ViewModal
        row={rowActions.view.row}
        isOpen={rowActions.view.isModalOpen}
        onClose={rowActions.view.closeModal}
      />
      <ReplaceConfirmModal
        isOpen={rowActions.replace.isConfirmModalOpen}
        isLoading={rowActions.replace.isLoading}
        onConfirm={rowActions.replace.confirm}
        onCancel={rowActions.replace.closeConfirmModal}
      />
      <RemoveConfirmModal
        isOpen={rowActions.remove.isConfirmModalOpen}
        onConfirm={rowActions.remove.confirm}
        onClose={rowActions.remove.closeConfirmModal}
      />
    </CosGeneralPanel>
  )
}

export default StorageModelsTable
