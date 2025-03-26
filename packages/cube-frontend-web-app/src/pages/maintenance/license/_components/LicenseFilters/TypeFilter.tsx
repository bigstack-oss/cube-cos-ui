import { CosDropdown } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'

// TODO:extract status enum to the openAPI docs.
export type LicenseType = 'Trial'

const licenseTypes = ['Trial'] satisfies LicenseType[]

export type TypeFilterProps = {
  selectedLicenseTypes: LicenseType[]
  handleLicenseTypesSelect: (types: LicenseType[]) => void
  handleClearLicenseTypesClick: () => void
}

export const TypeFilter = (props: TypeFilterProps) => {
  const {
    selectedLicenseTypes,
    handleLicenseTypesSelect,
    handleClearLicenseTypesClick,
  } = props

  const [licenseTypeSearchValue, setLicenseTypeSearchValue] = useState('')

  const handleLicenseTypeSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLicenseTypeSearchValue(e.target.value)
  }

  const handleSelectAllLicenseTypes = (checked: boolean) => {
    if (checked) {
      handleLicenseTypesSelect(licenseTypes)
    } else {
      handleLicenseTypesSelect([])
    }
  }

  const handleLicenseTypeClick = (licenseType: LicenseType) => {
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
      type="search-checkbox"
      variant="default"
      selectedItems={selectedLicenseTypes}
      searchValue={licenseTypeSearchValue}
      onSearchChange={handleLicenseTypeSearchChange}
      onAllCheckChange={handleSelectAllLicenseTypes}
      onClearClick={handleClearLicenseTypesClick}
    >
      <CosDropdown.Trigger placeholder="Select a Type">
        {selectedLicenseTypes.length > 0 ? `Types` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {licenseTypes.map((licenseType) => {
          if (
            licenseTypeSearchValue &&
            !licenseType
              .toLowerCase()
              .includes(licenseTypeSearchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={licenseType}
              item={licenseType}
              onClick={() => handleLicenseTypeClick(licenseType)}
            >
              {licenseType}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
