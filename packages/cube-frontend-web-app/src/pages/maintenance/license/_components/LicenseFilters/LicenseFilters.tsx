import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import {
  GetLicensesProductsEnum,
  GetLicensesTypesEnum,
  ListLicenseCurrentStatus,
} from '@cube-frontend/api'
import { ProductFilter } from './ProductFilter'
import { LicenseStatusFilter } from './LicenseStatusFilter'
import { TypeFilter } from './TypeFilter'

export type LicenseFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedProducts: GetLicensesProductsEnum[]
  handleProductsSelect: (products: GetLicensesProductsEnum[]) => void
  selectedLicenseStatuses: ListLicenseCurrentStatus[]
  handleLicenseStatusesSelect: (
    licenseStatuses: ListLicenseCurrentStatus[],
  ) => void
  selectedLicenseTypes: GetLicensesTypesEnum[]
  handleLicenseTypesSelect: (licenseTypes: GetLicensesTypesEnum[]) => void
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
        />
        <ProductFilter
          selectedProducts={selectedProducts}
          handleProductsSelect={handleProductsSelect}
          handleClearProductsClick={handleClearProductsClick}
        />
        <LicenseStatusFilter
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
