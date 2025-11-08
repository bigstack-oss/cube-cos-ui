import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosButton } from '@cube-frontend/ui-library'
import CheckIcon from '@cube-frontend/ui-library/icons/monochrome/checkmark.svg?react'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { HardwareSerialNumberModal } from './HardwareSerialNumberModal/HardwareSerialNumberModal'
import { ImportLicenseModal } from './ImportLicenseModal/ImportLicenseModal'
import { useImportLicense } from './useImportLicense'

export type LicenseActionsProps = {
  onImportLicenseSuccess: () => void
}

export const LicenseActions = (props: LicenseActionsProps) => {
  const { onImportLicenseSuccess } = props

  const { t } = useTranslation()

  const [isHardwareSerialModalOpen, setIsHardwareSerialModalOpen] =
    useState(false)

  const {
    isVerifyingLicenseFile,
    isUploadingLicense,
    licenseVerifyInfo,
    showImportSuccessText,

    fileInputRef: licenseFileInputRef,
    handleFileChange,

    verifyLicenseErrorState,
    importLicenseErrorState,

    handleImportLicenseButtonClick,
    handleImportLicense,
    closeImportLicenseModal,
  } = useImportLicense({ onImportLicenseSuccess })

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <CosButton
            usage="icon-left"
            type="secondary"
            Icon={UploadIcon}
            loading={isVerifyingLicenseFile}
            onClick={handleImportLicenseButtonClick}
          >
            {t('maintenance.license.importLicense')}
          </CosButton>
          {showImportSuccessText && (
            <div className="flex items-center gap-x-2 text-status-positive-text">
              <CheckIcon className="icon-lg" />
              <span className="primary-body3">
                {t('maintenance.license.importLicenseSuccessfully')}
              </span>
            </div>
          )}
          <input
            ref={licenseFileInputRef}
            type="file"
            className="hidden"
            accept=".license"
            onChange={handleFileChange}
          />
          {(verifyLicenseErrorState || importLicenseErrorState) && (
            <div className="flex gap-x-2">
              <WarningFilledIcon className="icon-md-sm text-status-negative" />
              <span className="primary-body4 text-functional-text">
                {t('maintenance.license.invalidFiles')}
              </span>
            </div>
          )}
        </div>
        <CosButton onClick={() => setIsHardwareSerialModalOpen(true)}>
          {t('maintenance.license.getHardwareSerials')}
        </CosButton>
      </div>
      <HardwareSerialNumberModal
        isOpen={isHardwareSerialModalOpen}
        onCloseClick={() => setIsHardwareSerialModalOpen(false)}
      />
      {licenseVerifyInfo && (
        <ImportLicenseModal
          licenseVerifyInfo={licenseVerifyInfo}
          actionButtonLoading={isUploadingLicense}
          onActionClick={handleImportLicense}
          onCloseClick={closeImportLicenseModal}
        />
      )}
    </>
  )
}
