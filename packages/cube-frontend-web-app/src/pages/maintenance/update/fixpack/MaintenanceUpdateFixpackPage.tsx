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
import { useContext, useMemo } from 'react'
import { MaintenanceUpdateLayout } from '../_components/MaintenanceUpdateLayout'
import { ReleaseNotePanel } from '../_components/ReleaseNotePanel'
import { useCephHealthStatus } from '../_components/useCephHealthStatus'
import { useReleaseNotePanel } from '../_components/useReleaseNotePanel'
import { DeleteFixpackModal } from './actions/DeleteFixpackModal'
import { InstallAction } from './actions/InstallAction'
import { RemoveAction } from './actions/RemoveAction'
import { RollbackAction } from './actions/RollbackAction'
import { useDeleteFixpackModal } from './actions/useDeleteFixpackModal'
import {
  computeFixpacksActionState,
  FixpackActionState,
} from './computeFixpacksActionState'
import { InstallFixpackModal } from './install/InstallFixpackModal'
import { useInstallFixpackModal } from './install/useInstallFixpackModal'
import { FixpackRow, toFixpackDisplay } from './listFixpacksUtils'
import { UploadFixpackModal } from './UploadFixpackModal'
import { useListFixpacks } from './useListFixpacks'
import { useListFixpacksQuery } from './useListFixpacksQuery'
import { RollbackFixpackModal } from './rollback/RollbackFixpackModal'
import { useRollbackFixpackModal } from './rollback/useRollbackFixpackModal'
import { useTranslation } from 'react-i18next'

const FixpackTable = GetCosBasicTable<FixpackRow>()

export const MaintenanceUpdateFixpackPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { query, onPageChange, onItemsPerPageChange } = useListFixpacksQuery()

  const { showLoading, allFixpacks, pagedRows, totalItemCount, listFixpacks } =
    useListFixpacks(query)

  const {
    isOpen: isUploadModalOpen,
    open: openUploadModal,
    close: closeUploadModal,
  } = useOpenState()

  const { rowForReleaseNote, showReleaseNoteFor, releaseNotePanel } =
    useReleaseNotePanel<FixpackRow>()

  const cephHealthStatus = useCephHealthStatus()

  const fixpacksActionStates = useMemo<FixpackActionState[]>(
    () => computeFixpacksActionState(allFixpacks, cephHealthStatus),
    [allFixpacks, cephHealthStatus],
  )

  const {
    isInstallModalOpen,
    fixpackToInstall,
    onInstallClick,
    onInstallModalClose,
  } = useInstallFixpackModal(pagedRows)

  const {
    isRollbackModalOpen,
    fixpackToRollback,
    onRollbackClick,
    onRollbackModalClose,
  } = useRollbackFixpackModal(pagedRows)

  const { fixpackToDelete, showDeleteFixpackModal, closeDeleteFixpackModal } =
    useDeleteFixpackModal(pagedRows)

  const onFixpackDeleted = (): void => {
    listFixpacks()
    closeDeleteFixpackModal()
  }

  const formatUpdatedAt = (updatedAt: string): string => {
    if (!updatedAt) return ''
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  const { t } = useTranslation()

  const renderAction = (row: FixpackRow, actionState: FixpackActionState) => {
    const { install, rollback, remove } = actionState

    return (
      <div className="flex items-center justify-between gap-x-2">
        {install !== 'hidden' && (
          <InstallAction state={install} onClick={() => onInstallClick(row)} />
        )}
        {rollback !== 'hidden' && (
          <RollbackAction
            state={rollback}
            onClick={() => onRollbackClick(row)}
          />
        )}
        {remove !== 'hidden' && (
          <RemoveAction
            state={remove}
            onClick={() => showDeleteFixpackModal(row.version)}
          />
        )}
      </div>
    )
  }

  const currentFixpackVersionDisplay = useMemo(() => {
    const { fixpack } = dataCenter!

    return (
      toFixpackDisplay(fixpack.name, fixpack.version) ||
      t('maintenance.update.fixpack.fixpack')
    )
  }, [dataCenter, t])

  return (
    <MaintenanceUpdateLayout
      currentVersion={currentFixpackVersionDisplay}
      lastUpdated={dataCenter!.fixpack.updatedAt}
    >
      <CosCollapsiblePanelLayout
        rightPanelWidthPercentage={40}
        isControlledPanelOpen={releaseNotePanel.isOpen}
        onControlledPanelOpenChange={releaseNotePanel.toggle}
      >
        <CosCollapsiblePanelLayout.LeftPanel
          topic={t('maintenance.update.fixpack.fixpackList')}
          rightSlot={
            <CosButton disabled={showLoading} onClick={openUploadModal}>
              {t('maintenance.update.fixpack.uploadFixpack')}
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
            <FixpackTable
              rows={pagedRows}
              isLoading={showLoading}
              rowClassName="cursor-pointer"
              onRowClick={showReleaseNoteFor}
            >
              <FixpackTable.Column
                label={t('maintenance.update.fixpack.fixpack')}
                property="display"
                fitContent={true}
                emphasize={true}
              >
                {(fixpackDisplay) => (
                  <div className="whitespace-nowrap">{fixpackDisplay}</div>
                )}
              </FixpackTable.Column>
              <FixpackTable.Column
                label={t('maintenance.update.fixpack.lastUpdated')}
                property="updatedAt"
                fitContent={true}
              >
                {formatUpdatedAt}
              </FixpackTable.Column>
              <FixpackTable.Column
                label={t('maintenance.update.fixpack.note')}
                property="note"
              />
              <FixpackTable.Column
                fitContent={true}
                skeletonVariant="icon-right"
              >
                {(_, row, index) => {
                  const actionState = fixpacksActionStates[index]
                  return !!actionState && renderAction(row, actionState)
                }}
              </FixpackTable.Column>
            </FixpackTable>
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
            rowForReleaseNote?.display ||
            t('maintenance.update.fixpack.fixpackVersion')
          }
        >
          <ReleaseNotePanel releaseNote={rowForReleaseNote?.details} />
        </CosCollapsiblePanelLayout.RightPanel>
      </CosCollapsiblePanelLayout>
      <UploadFixpackModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onMd5Verified={listFixpacks}
      />
      <InstallFixpackModal
        isOpen={isInstallModalOpen}
        fixpack={fixpackToInstall}
        onInstallationRequested={listFixpacks}
        onClose={onInstallModalClose}
      />
      <RollbackFixpackModal
        isOpen={isRollbackModalOpen}
        fixpack={fixpackToRollback}
        onRollbackRequested={listFixpacks}
        onClose={onRollbackModalClose}
      />
      <DeleteFixpackModal
        fixpack={fixpackToDelete}
        onCloseClick={closeDeleteFixpackModal}
        onDeleted={onFixpackDeleted}
      />
    </MaintenanceUpdateLayout>
  )
}
