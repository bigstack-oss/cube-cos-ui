import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import {
  CosButton,
  CosCollapsiblePanelLayout,
  CosPagination,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
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
  FirmwareActionState,
  computeFirmwaresActionState,
} from './computeFirmwaresActionState'
import { FirmwareRow } from './listFirmwaresUtils'
import { UploadFirmwareModal } from './UploadFirmwareModal'
import { useListFirmwares } from './useListFirmwares'
import { useListFirmwaresQuery } from './useListFirmwaresQuery'

const FirmwareTable = GetCosBasicTable<FirmwareRow>()

export const MaintenanceUpdateFirmwarePage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const { query, onPageChange, onItemsPerPageChange } = useListFirmwaresQuery()

  const {
    showLoading,
    allFirmwares,
    pagedRows,
    totalItemCount,
    listFirmwares,
  } = useListFirmwares(query)

  const {
    isOpen: isUploadModalOpen,
    open: openUploadModal,
    close: closeUploadModal,
  } = useOpenState()

  const { rowForReleaseNote, showReleaseNoteFor, releaseNotePanel } =
    useReleaseNotePanel<FirmwareRow>()

  const cephHealthStatus = useCephHealthStatus()

  const firmwaresActionStates = useMemo<FirmwareActionState[]>(
    () => computeFirmwaresActionState(allFirmwares, cephHealthStatus),
    [allFirmwares, cephHealthStatus],
  )

  const { firmwareToUpdate, onOpenUpdateModal, onCloseUpdateModal } =
    useUpdateFirmwareModal(allFirmwares)

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

  const renderActions = (
    row: FirmwareRow,
    actionState: FirmwareActionState,
  ) => {
    const { update, delete: deleteState } = actionState

    return (
      <div className="flex items-center justify-between gap-x-2">
        {update !== 'hidden' && (
          <UpdateAction
            state={update}
            onClick={() => onOpenUpdateModal(row.version)}
          />
        )}
        {deleteState !== 'hidden' && (
          <DeleteAction
            state={deleteState}
            onClick={() => showDeleteFirmwareModal(row.version)}
          />
        )}
      </div>
    )
  }

  return (
    <MaintenanceUpdateLayout
      currentVersion={
        dataCenter!.firmware.version ||
        t('maintenance.update.firmware.firmware')
      }
      lastUpdated={dataCenter!.firmware.updatedAt}
    >
      <CosCollapsiblePanelLayout
        rightPanelWidthPercentage={40}
        isControlledPanelOpen={releaseNotePanel.isOpen}
        onControlledPanelOpenChange={releaseNotePanel.toggle}
      >
        <CosCollapsiblePanelLayout.LeftPanel
          topic={t('maintenance.update.firmware.firmwareList')}
          rightSlot={
            <CosButton disabled={showLoading} onClick={openUploadModal}>
              {t('maintenance.update.firmware.uploadFirmware')}
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
              rows={pagedRows}
              isLoading={showLoading}
              rowClassName="cursor-pointer"
              onRowClick={showReleaseNoteFor}
            >
              <FirmwareTable.Column
                label={t('maintenance.update.firmware.firmware')}
                property="version"
                fitContent={true}
                emphasize={true}
              >
                {(version) => (
                  <div className="whitespace-nowrap">{version}</div>
                )}
              </FirmwareTable.Column>
              <FirmwareTable.Column
                label={t('maintenance.update.firmware.lastUpdated')}
                property="updatedAt"
                fitContent={true}
              >
                {formatUpdatedAt}
              </FirmwareTable.Column>
              <FirmwareTable.Column
                label={t('maintenance.update.firmware.note')}
                property="releaseNotes"
              />
              <FirmwareTable.Column
                fitContent={true}
                skeletonVariant="icon-right"
              >
                {(_, row, index) => {
                  const actionState = firmwaresActionStates[index]
                  return !!actionState && renderActions(row, actionState)
                }}
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
          topic={
            rowForReleaseNote?.version ||
            t('maintenance.update.firmware.firmwareVersion')
          }
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
