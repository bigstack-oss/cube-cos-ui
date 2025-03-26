import { useContext, useState } from 'react'
import { LicensesApiGetLicensesRequest } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosPagination,
  CosStroke,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { LicenseFilters } from './_components/LicenseFilters/LicenseFilters'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { HardwareSerialNumberModal } from './_components/HardwareSerialNumberModal/HardwareSerialNumberModal'
import { ProductItem } from './_components/LicenseFilters/ProductFilter'
import { LicenseType } from './_components/LicenseFilters/TypeFilter'
import { LicenseStatus } from './_components/LicenseFilters/StatusFilter'
import { LicenseRow, LicenseTable } from './_components/LicenseTable'

export const MaintenanceLicensePage = () => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([])
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<
    LicenseType[]
  >([])
  const [selectedLicenseStatuses, setSelectedLicenseStatuses] = useState<
    LicenseStatus[]
  >([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_ITEMS_PER_PAGE)

  const { data: licenseData, isLoading } = useCosGetRequest(
    licenseApi.getLicenses,
    () => {
      return {
        dataCenter,
        pageNum,
        pageSize,
        keyword: debouncedSearchKeyword,
        // TODO: add products, licenseTypes and licenseStatuses to the openAPI.
        // @ts-expect-error: the API not supported yet.
        products: selectedProducts.map((product) => product.name),
        licenseTypes: selectedLicenseTypes,
        licenseStatuses: selectedLicenseStatuses,
      } satisfies LicensesApiGetLicensesRequest
    },
  )

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const handleImportLicenseButtonClick = () => {
    // TODO
  }

  const rows: LicenseRow[] =
    licenseData?.licenses?.map((license) => ({
      ...license,
      id: license.serial,
    })) || []

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const [isHardwareSerialModalOpen, setIsHardwareSerialModalOpen] =
    useState(false)

  return (
    <>
      <CosGeneralPanel topic="License">
        <div className="flex flex-col gap-y-6 pt-2">
          <div className="flex items-center gap-x-4">
            <CosButton
              usage="icon-left"
              Icon={UploadIcon}
              onClick={handleImportLicenseButtonClick}
            >
              Import License
            </CosButton>
            <div className="flex gap-x-2">
              <WarningFilledIcon className="icon-md-sm text-status-negative" />
              <span className="primary-body4 text-functional-text">
                Invalid files.
              </span>
            </div>
          </div>
          <CosStroke type="dot" />
          <div className="flex flex-col gap-y-2">
            <h5 className="primary-h5 text-functional-text">License</h5>
            <div className="flex items-center justify-between">
              <LicenseFilters
                searchKeyword={searchKeyword}
                handleSearchKeywordChange={setSearchKeyword}
                handleSearchKeywordClear={handleSearchKeywordClear}
                selectedProducts={selectedProducts}
                handleProductsSelect={setSelectedProducts}
                selectedLicenseStatuses={selectedLicenseStatuses}
                handleLicenseStatusesSelect={setSelectedLicenseStatuses}
                selectedLicenseTypes={selectedLicenseTypes}
                handleLicenseTypesSelect={setSelectedLicenseTypes}
              />
              <CosButton onClick={() => setIsHardwareSerialModalOpen(true)}>
                Get hardware serials
              </CosButton>
            </div>
            <LicenseTable
              rows={rows}
              isLoading={isLoading}
              skeletonRowCount={pageSize}
            />
          </div>
          <CosPagination
            isLoading={isLoading}
            totalItems={licenseData?.page?.totalItemCount ?? 0}
            currentPage={pageNum}
            itemsPerPage={pageSize}
            onPageChange={setPageNum}
            onItemsPerPageChange={setPageSize}
          />
        </div>
      </CosGeneralPanel>
      <HardwareSerialNumberModal
        isOpen={isHardwareSerialModalOpen}
        onCloseClick={() => setIsHardwareSerialModalOpen(false)}
      />
    </>
  )
}
