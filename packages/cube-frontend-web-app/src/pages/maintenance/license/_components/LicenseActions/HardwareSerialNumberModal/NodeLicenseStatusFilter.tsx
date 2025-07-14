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
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedLicenseStatuses}
      onAllCheckChange={handleSelectAllLicenseStatuses}
      onClearSelection={handleClearNodeLicenseStatusesClick}
    >
      <CosDropdown.Trigger placeholder="Statuses">
        {selectedLicenseStatuses.length > 0 ? `Statuses` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {nodeLicenseStatuses.map((licenseStatus) => (
          <CosDropdown.Item
            key={licenseStatus}
            item={licenseStatus}
            onClick={() => handleNodeLicenseStatusClick(licenseStatus)}
          >
            {licenseStatus}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
