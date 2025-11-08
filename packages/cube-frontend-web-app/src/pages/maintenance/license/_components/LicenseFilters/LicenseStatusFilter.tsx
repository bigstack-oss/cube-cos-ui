import { useTranslation } from 'react-i18next'
import { ListLicenseCurrentStatus } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'

const licenseStatuses = Object.values(ListLicenseCurrentStatus)

export type LicenseStatusFilterProps = {
  selectedLicenseStatuses: ListLicenseCurrentStatus[]
  handleLicenseStatusesSelect: (statuses: ListLicenseCurrentStatus[]) => void
  handleClearLicenseStatusesClick: () => void
}

export const LicenseStatusFilter = (props: LicenseStatusFilterProps) => {
  const {
    selectedLicenseStatuses,
    handleLicenseStatusesSelect,
    handleClearLicenseStatusesClick,
  } = props

  const { t } = useTranslation()

  const licenseStatusDisplay: Record<ListLicenseCurrentStatus, string> = {
    expired: t('maintenance.license.status.expired'),
    valid: t('maintenance.license.status.valid'),
  }

  const handleSelectAllLicenseStatuses = (checked: boolean) => {
    if (checked) {
      handleLicenseStatusesSelect(licenseStatuses)
    } else {
      handleLicenseStatusesSelect([])
    }
  }

  const handleLicenseStatusClick = (
    licenseStatus: ListLicenseCurrentStatus,
  ) => {
    const licenseStatusSet = new Set(selectedLicenseStatuses)

    if (licenseStatusSet.has(licenseStatus)) {
      handleLicenseStatusesSelect(
        selectedLicenseStatuses.filter((l) => l !== licenseStatus),
      )
    } else {
      handleLicenseStatusesSelect([...selectedLicenseStatuses, licenseStatus])
    }
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedLicenseStatuses}
      onAllCheckChange={handleSelectAllLicenseStatuses}
      onClearSelection={handleClearLicenseStatusesClick}
    >
      <CosDropdown.Trigger placeholder={t('maintenance.license.statuses')}>
        {selectedLicenseStatuses.length > 0
          ? t('maintenance.license.statuses')
          : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {licenseStatuses.map((licenseStatus) => (
          <CosDropdown.Item
            key={licenseStatus}
            item={licenseStatus}
            onClick={() => handleLicenseStatusClick(licenseStatus)}
          >
            {licenseStatusDisplay[licenseStatus]}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
