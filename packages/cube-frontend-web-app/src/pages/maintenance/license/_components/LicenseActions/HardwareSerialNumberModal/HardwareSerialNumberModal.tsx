import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { CosModal } from '@cube-frontend/ui-library'
import CheckIcon from '@cube-frontend/ui-library/icons/monochrome/checkmark.svg?react'
import { LicenseAttachmentFilters } from './LicenseAttachmentFilters'
import { LicenseAttachmentTable } from './LicenseAttachmentTable'
import { ProductDropdown } from './ProductDropdown'
import { useCopySerialNumber } from './useCopySerialNumber'
import { useLicenseAttachmentRowSelection } from './useLicenseAttachmentRowSelection'
import { useLicenseAttachmentTable } from './useLicenseAttachmentTable'

export type HardwareSerialNumberModalProps = {
  isOpen: boolean
  onCloseClick: () => void
}

export const HardwareSerialNumberModal = (
  props: HardwareSerialNumberModalProps,
) => {
  const { isOpen, onCloseClick: onCloseClickProp } = props

  const { t } = useTranslation()

  const {
    isLoading,
    rows,
    searchKeyword,
    selectedProduct,
    selectedRoles,
    selectedNodeLicenseStatuses,
    setSearchKeyword,
    setSelectedProduct,
    setSelectedRoles,
    setSelectedNodeLicenseStatuses,
    clearKeyword,
    resetFilters,
  } = useLicenseAttachmentTable(isOpen)

  const {
    selectedRowIds,
    selectedLicenseAttachmentRows,
    handleAllCheckChange,
    handleRowCheckChange,
  } = useLicenseAttachmentRowSelection(rows)

  const { showCopySuccess, copySerialNumber } = useCopySerialNumber(
    selectedLicenseAttachmentRows,
  )

  const handleCloseClick = () => {
    resetFilters()
    onCloseClickProp()
  }

  return (
    <CosModal
      className="min-w-[min(1000px,_100dvw)]"
      title={t('maintenance.license.hardwareSerialsModal.title')}
      footerMessage={
        showCopySuccess && (
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-x-1 text-status-positive-text">
              <CheckIcon className="icon-md" />
              <span className="primary-body4">
                {t(
                  'maintenance.license.hardwareSerialsModal.copiedToClipboard',
                )}
              </span>
            </div>
          </div>
        )
      }
      size="sm"
      isOpen={isOpen}
      actionText={t('maintenance.license.hardwareSerialsModal.copyToClipboard')}
      actionButtonProps={{ disabled: selectedRowIds.length === 0 }}
      onActionClick={copySerialNumber}
      onCloseClick={handleCloseClick}
    >
      <div className={twMerge('flex h-[400px] flex-col gap-y-8 overflow-auto')}>
        <div className="w-fit">
          <ProductDropdown
            selectedProduct={selectedProduct}
            handleProductSelect={setSelectedProduct}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h5 className="primary-h5 text-functional-text">
            {t('maintenance.license.hardwareSerialsModal.hosts')}
          </h5>
          <LicenseAttachmentFilters
            searchKeyword={searchKeyword}
            handleSearchKeywordChange={setSearchKeyword}
            handleSearchKeywordClear={clearKeyword}
            selectedNodeLicenseStatuses={selectedNodeLicenseStatuses}
            handleNodeLicenseStatusesSelect={setSelectedNodeLicenseStatuses}
            selectedRoles={selectedRoles}
            handleRolesSelect={setSelectedRoles}
          />
          <LicenseAttachmentTable
            rows={rows}
            isLoading={isLoading}
            selectedRowIds={selectedRowIds}
            showHeaderCheckbox={true}
            onCheckChange={handleRowCheckChange}
            onAllCheckChange={handleAllCheckChange}
          />
        </div>
      </div>
    </CosModal>
  )
}
