import {
  CosButton,
  CosCollapsiblePanelLayout,
  CosPagination,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { MaintenanceUpdateLayout } from '../_components/MaintenanceUpdateLayout'
import { ReleaseNotePanel } from '../_components/ReleaseNotePanel'
import { useCephHealthStatus } from '../_components/useCephHealthStatus'
import { useReleaseNotePanel } from '../_components/useReleaseNotePanel'
import { DeleteAction } from './actions/delete/DeleteAction'
import { DeleteFirmwareModal } from './actions/delete/DeleteFirmwareModal'
import { useDeleteFirmwareModal } from './actions/delete/useDeleteFirmwareModal'
import { UpdateAction } from './actions/update/UpdateAction'
import { UpdateFirmwareModal } from './actions/update/UpdateFirmwareModal'
import { useUpdateFirmwareModal } from './actions/update/useUpdateFirmwareModal'
import {
  computeFirmwareDeleteActionState,
  computeFirmwareUpdateActionState,
} from './computeFirmwaresActionState'
import { FirmwareRow } from './listFirmwaresUtils'
import { UploadFirmwareModal } from './UploadFirmwareModal'
import { useListFirmwares } from './useListFirmwares'
import { useListFirmwaresQuery } from './useListFirmwaresQuery'
import { useUpdatingFirmwareVersion } from './useUpdatingFirmwareVersion'

const FirmwareTable = GetCosBasicTable<FirmwareRow>()

export const MaintenanceUpdateFirmwarePage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { query, onPageChange, onItemsPerPageChange } = useListFirmwaresQuery()

  const { showLoading, rows, totalItemCount, listFirmwares } =
    useListFirmwares(query)

  const updatingFirmwareVersion = useUpdatingFirmwareVersion()

  const {
    isOpen: isUploadModalOpen,
    open: openUploadModal,
    close: closeUploadModal,
  } = useOpenState()

  const { rowForReleaseNote, showReleaseNoteFor, releaseNotePanel } =
    useReleaseNotePanel<FirmwareRow>()

  const cephHealthStatus = useCephHealthStatus()

  const { firmwareToUpdate, onOpenUpdateModal, onCloseUpdateModal } =
    useUpdateFirmwareModal(rows)

  const {
    firmwareVersionToDelete,
    showDeleteFirmwareModal,
    closeDeleteFirmwareModal,
  } = useDeleteFirmwareModal()

  const onFirmwareDeleted = (): void => {
    listFirmwares()
    closeDeleteFirmwareModal()
  }

  const formatUpdatedAt = (updatedAt: string): string => {
    if (!updatedAt) return ''
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  const renderActions = (row: FirmwareRow) => {
    const version = row.version

    const updateActionState = computeFirmwareUpdateActionState(
      row,
      cephHealthStatus,
      updatingFirmwareVersion,
    )

    const deleteActionState = computeFirmwareDeleteActionState(row)

    return (
      <div className="flex items-center">
        {updateActionState !== 'hidden' && (
          <UpdateAction
            state={updateActionState}
            onClick={() => onOpenUpdateModal(version)}
          />
        )}
        {deleteActionState !== 'hidden' && (
          <DeleteAction
            state={deleteActionState}
            onClick={() => showDeleteFirmwareModal(version)}
          />
        )}
      </div>
    )
  }

  return (
    <MaintenanceUpdateLayout
      currentVersion={dataCenter!.firmware.version || 'Firmware'}
      lastUpdated={dataCenter!.firmware.updatedAt}
    >
      <CosCollapsiblePanelLayout
        rightPanelWidthPercentage={40}
        isControlledPanelOpen={releaseNotePanel.isOpen}
        onControlledPanelOpenChange={releaseNotePanel.toggle}
      >
        <CosCollapsiblePanelLayout.LeftPanel
          topic="Firmware List"
          rightSlot={
            <CosButton disabled={showLoading} onClick={openUploadModal}>
              Upload Firmware
            </CosButton>
          }
          customToggleButton={
            <button
              type="button"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary-50"
            >
              <InformationCircle className="icon-md text-functional-text" />
            </button>
          }
        >
          <div className="flex flex-col gap-y-6">
            <FirmwareTable
              rows={rows}
              isLoading={showLoading}
              rowClassName="cursor-pointer"
              onRowClick={showReleaseNoteFor}
            >
              <FirmwareTable.Column
                label="Firmware"
                property="version"
                fitContent={true}
                emphasize={true}
              >
                {(version) => (
                  <div className="whitespace-nowrap">{version}</div>
                )}
              </FirmwareTable.Column>
              <FirmwareTable.Column
                label="Last Updated"
                property="updatedAt"
                fitContent={true}
              >
                {formatUpdatedAt}
              </FirmwareTable.Column>
              <FirmwareTable.Column label="Note" property="releaseNotes" />
              <FirmwareTable.Column
                fitContent={true}
                skeletonVariant="icon-right"
              >
                {(_, row) => renderActions(row)}
              </FirmwareTable.Column>
            </FirmwareTable>
            <CosPagination
              isLoading={showLoading}
              totalItems={totalItemCount}
              currentPage={query.page}
              itemsPerPage={query.pageSize}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </div>
        </CosCollapsiblePanelLayout.LeftPanel>
        <CosCollapsiblePanelLayout.RightPanel
          topic={rowForReleaseNote?.version || 'Firmware Version'}
        >
          <ReleaseNotePanel releaseNote={rowForReleaseNote?.releaseNotes} />
        </CosCollapsiblePanelLayout.RightPanel>
      </CosCollapsiblePanelLayout>
      <UploadFirmwareModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onMd5Verified={listFirmwares}
      />
      <UpdateFirmwareModal
        firmware={firmwareToUpdate}
        onCloseClick={onCloseUpdateModal}
      />
      <DeleteFirmwareModal
        version={firmwareVersionToDelete}
        onCloseClick={closeDeleteFirmwareModal}
        onDeleted={onFirmwareDeleted}
      />
    </MaintenanceUpdateLayout>
  )
}
