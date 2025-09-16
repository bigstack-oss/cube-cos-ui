import {
  CosButton,
  CosCollapsiblePanelLayout,
  CosPagination,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import Trash from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { MaintenanceUpdateLayout } from '../_components/MaintenanceUpdateLayout'
import { ReleaseNotePanel } from '../_components/ReleaseNotePanel'
import { useReleaseNotePanel } from '../_components/useReleaseNotePanel'
import { FirmwareRow } from './listFirmwaresUtils'
import { UploadFirmwareModal } from './UploadFirmwareModal'
import { useListFirmwares } from './useListFirmwares'
import { useListFirmwaresQuery } from './useListFirmwaresQuery'

const FirmwareTable = GetCosBasicTable<FirmwareRow>()

export const MaintenanceUpdateFirmwarePage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { query, onPageChange, onItemsPerPageChange } = useListFirmwaresQuery()

  const { showLoading, rows, totalItemCount, listFirmwares } =
    useListFirmwares(query)

  const {
    isOpen: isUploadModalOpen,
    open: openUploadModal,
    close: closeUploadModal,
  } = useOpenState()

  const { rowForReleaseNote, showReleaseNoteFor, releaseNotePanel } =
    useReleaseNotePanel<FirmwareRow>()

  const formatUpdatedAt = (updatedAt: string): string => {
    if (!updatedAt) return ''
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
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
                {() => (
                  <div className="flex items-center">
                    <CosButton
                      type="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Update
                    </CosButton>
                    <CosButton
                      type="ghost"
                      usage="icon-only"
                      Icon={Trash}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
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
    </MaintenanceUpdateLayout>
  )
}
