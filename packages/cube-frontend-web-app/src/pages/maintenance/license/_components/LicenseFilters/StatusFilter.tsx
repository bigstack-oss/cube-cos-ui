import { ChangeEvent, useState } from 'react'
import { ListLicenseCurrentStatus } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'

const licenseStatuses = Object.values(ListLicenseCurrentStatus)

export type StatusFilterProps = {
  selectedLicenseStatuses: ListLicenseCurrentStatus[]
  handleLicenseStatusesSelect: (statuses: ListLicenseCurrentStatus[]) => void
  handleClearLicenseStatusesClick: () => void
}

export const StatusFilter = (props: StatusFilterProps) => {
  const {
    selectedLicenseStatuses,
    handleLicenseStatusesSelect,
    handleClearLicenseStatusesClick,
  } = props

  const [licenseStatusSearchValue, setLicenseStatusSearchValue] = useState('')
  const handleLicenseStatusSearchChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setLicenseStatusSearchValue(e.target.value)
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
      type="search-checkbox"
      variant="default"
      selectedItems={selectedLicenseStatuses}
      searchValue={licenseStatusSearchValue}
      onSearchChange={handleLicenseStatusSearchChange}
      onAllCheckChange={handleSelectAllLicenseStatuses}
      onClearClick={handleClearLicenseStatusesClick}
    >
      <CosDropdown.Trigger placeholder="Select a Status">
        {selectedLicenseStatuses.length > 0 ? `Statuses` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {licenseStatuses.map((licenseStatus) => {
          if (
            licenseStatusSearchValue &&
            !licenseStatus
              .toLowerCase()
              .includes(licenseStatusSearchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={licenseStatus}
              item={licenseStatus}
              onClick={() => handleLicenseStatusClick(licenseStatus)}
            >
              {licenseStatus}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
