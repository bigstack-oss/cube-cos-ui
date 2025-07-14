import { ListLicenseCurrentStatus } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

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
      <CosDropdown.Trigger placeholder="Statuses">
        {selectedLicenseStatuses.length > 0 ? `Statuses` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {licenseStatuses.map((licenseStatus) => (
          <CosDropdown.Item
            key={licenseStatus}
            item={licenseStatus}
            onClick={() => handleLicenseStatusClick(licenseStatus)}
          >
            {upperFirst(licenseStatus)}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
