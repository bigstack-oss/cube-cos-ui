import { GetLicensesTypesEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

const licenseTypes = Object.values(GetLicensesTypesEnum)

export type TypeFilterProps = {
  selectedLicenseTypes: GetLicensesTypesEnum[]
  handleLicenseTypesSelect: (types: GetLicensesTypesEnum[]) => void
  handleClearLicenseTypesClick: () => void
}

export const TypeFilter = (props: TypeFilterProps) => {
  const {
    selectedLicenseTypes,
    handleLicenseTypesSelect,
    handleClearLicenseTypesClick,
  } = props

  const handleSelectAllLicenseTypes = (checked: boolean) => {
    if (checked) {
      handleLicenseTypesSelect(licenseTypes)
    } else {
      handleLicenseTypesSelect([])
    }
  }

  const handleLicenseTypeClick = (licenseType: GetLicensesTypesEnum) => {
    const licenseTypeSet = new Set(selectedLicenseTypes)

    if (licenseTypeSet.has(licenseType)) {
      handleLicenseTypesSelect(
        selectedLicenseTypes.filter((l) => l !== licenseType),
      )
    } else {
      handleLicenseTypesSelect([...selectedLicenseTypes, licenseType])
    }
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedLicenseTypes}
      onAllCheckChange={handleSelectAllLicenseTypes}
      onClearSelection={handleClearLicenseTypesClick}
    >
      <CosDropdown.Trigger placeholder="Types">
        {selectedLicenseTypes.length > 0 ? `Types` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {licenseTypes.map((licenseType) => (
          <CosDropdown.Item
            key={licenseType}
            item={licenseType}
            onClick={() => handleLicenseTypeClick(licenseType)}
          >
            {upperFirst(licenseType)}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
