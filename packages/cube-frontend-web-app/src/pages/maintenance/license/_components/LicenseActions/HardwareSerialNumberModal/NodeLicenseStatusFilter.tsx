import { ChangeEvent, useState } from 'react'
import { NodeLicenseCurrentStatus } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'

const nodeLicenseStatuses = Object.values(NodeLicenseCurrentStatus)

export type LicenseStatusFilterProps = {
  selectedNodeLicenseStatuses: NodeLicenseCurrentStatus[]
  handleNodeLicenseStatusesSelect: (
    statuses: NodeLicenseCurrentStatus[],
  ) => void
  handleClearNodeLicenseStatusesClick: () => void
}

export const NodeLicenseStatusFilter = (props: LicenseStatusFilterProps) => {
  const {
    selectedNodeLicenseStatuses: selectedLicenseStatuses,
    handleNodeLicenseStatusesSelect,
    handleClearNodeLicenseStatusesClick,
  } = props

  const [nodeLicenseStatusSearchValue, setNodeLicenseStatusSearchValue] =
    useState('')

  const handleNodeLicenseStatusSearchChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setNodeLicenseStatusSearchValue(e.target.value)
  }

  const handleSelectAllLicenseStatuses = (checked: boolean) => {
    if (checked) {
      handleNodeLicenseStatusesSelect(nodeLicenseStatuses)
    } else {
      handleNodeLicenseStatusesSelect([])
    }
  }

  const handleNodeLicenseStatusClick = (
    nodeLicenseStatus: NodeLicenseCurrentStatus,
  ) => {
    const licenseStatusSet = new Set(selectedLicenseStatuses)

    if (licenseStatusSet.has(nodeLicenseStatus)) {
      handleNodeLicenseStatusesSelect(
        selectedLicenseStatuses.filter((l) => l !== nodeLicenseStatus),
      )
    } else {
      handleNodeLicenseStatusesSelect([
        ...selectedLicenseStatuses,
        nodeLicenseStatus,
      ])
    }
  }

  return (
    <CosDropdown
      type="search-checkbox"
      variant="default"
      selectedItems={selectedLicenseStatuses}
      searchValue={nodeLicenseStatusSearchValue}
      onSearchChange={handleNodeLicenseStatusSearchChange}
      onAllCheckChange={handleSelectAllLicenseStatuses}
      onClearClick={handleClearNodeLicenseStatusesClick}
    >
      <CosDropdown.Trigger placeholder="Select Statuses">
        {selectedLicenseStatuses.length > 0 ? `Statuses` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {nodeLicenseStatuses.map((licenseStatus) => {
          if (
            nodeLicenseStatusSearchValue &&
            !licenseStatus
              .toLowerCase()
              .includes(nodeLicenseStatusSearchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={licenseStatus}
              item={licenseStatus}
              onClick={() => handleNodeLicenseStatusClick(licenseStatus)}
            >
              {licenseStatus}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
