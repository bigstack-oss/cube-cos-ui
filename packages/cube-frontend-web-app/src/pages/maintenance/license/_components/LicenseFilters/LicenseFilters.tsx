import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { ProductFilter, ProductItem } from './ProductFilter'
import { LicenseStatus, StatusFilter } from './StatusFilter'
import { LicenseType, TypeFilter } from './TypeFilter'

export type LicenseFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedProducts: ProductItem[]
  handleProductsSelect: (products: ProductItem[]) => void
  selectedLicenseStatuses: LicenseStatus[]
  handleLicenseStatusesSelect: (licenseStatuses: LicenseStatus[]) => void
  selectedLicenseTypes: LicenseType[]
  handleLicenseTypesSelect: (licenseTypes: LicenseType[]) => void
}

export const LicenseFilters = (props: LicenseFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedProducts,
    handleProductsSelect,
    selectedLicenseStatuses,
    handleLicenseStatusesSelect,
    selectedLicenseTypes,
    handleLicenseTypesSelect,
  } = props

  const showClearAllFilter =
    !!searchKeyword ||
    selectedProducts.length > 0 ||
    selectedLicenseStatuses.length > 0 ||
    selectedLicenseTypes.length > 0

  const handleClearProductsClick = () => {
    handleProductsSelect([])
  }
  const handleClearLicenseStatusesClick = () => {
    handleLicenseStatusesSelect([])
  }
  const handleClearLicenseTypesClick = () => {
    handleLicenseTypesSelect([])
  }

  const handleClearAllFilter = () => {
    handleSearchKeywordClear()
    handleClearProductsClick()
    handleClearLicenseStatusesClick()
    handleClearLicenseTypesClick()
  }

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2">
        <CosSearchBarFilter
          className="w-[320px]"
          value={searchKeyword}
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
          onInputClear={handleSearchKeywordClear}
          placeholder="Search"
          showDropdown={false}
        />
        <ProductFilter
          selectedProducts={selectedProducts}
          handleProductsSelect={handleProductsSelect}
          handleClearProductsClick={handleClearProductsClick}
        />
        <StatusFilter
          selectedLicenseStatuses={selectedLicenseStatuses}
          handleLicenseStatusesSelect={handleLicenseStatusesSelect}
          handleClearLicenseStatusesClick={handleClearLicenseStatusesClick}
        />
        <TypeFilter
          selectedLicenseTypes={selectedLicenseTypes}
          handleLicenseTypesSelect={handleLicenseTypesSelect}
          handleClearLicenseTypesClick={handleClearLicenseTypesClick}
        />
      </div>
      {showClearAllFilter && (
        <>
          <div className="w-px self-stretch bg-functional-border-divider" />
          <CosIconFrame
            className="cursor-pointer"
            size="md"
            onClick={handleClearAllFilter}
          >
            <XIcon className="icon-md-sm text-functional-text-light" />
          </CosIconFrame>
        </>
      )}
    </div>
  )
}
