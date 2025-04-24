import { useContext, useEffect, useState } from 'react'
import {
  GetLicensesProductsEnum,
  ListLicenseCurrentStatus,
  GetLicensesTypesEnum,
  LicensesApiGetLicensesRequest,
} from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosPagination,
  CosStroke,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { LicenseFilters } from './_components/LicenseFilters/LicenseFilters'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { LicenseRow, LicenseTable } from './_components/LicenseTable'
import { useTopLicenseNaggingStore } from '@cube-frontend/web-app/stores/topLicenseNaggingStore'
import { LicenseActions } from './_components/LicenseActions/LicenseActions'

export const MaintenanceLicensePage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<
    GetLicensesProductsEnum[]
  >([])
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<
    GetLicensesTypesEnum[]
  >([])
  const [selectedLicenseStatuses, setSelectedLicenseStatuses] = useState<
    ListLicenseCurrentStatus[]
  >([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_ITEMS_PER_PAGE)

  const {
    data: licenseData,
    isLoading,
    getResource: fetchLicenses,
  } = useCosGetRequest(licenseApi.getLicenses, () => {
    return {
      dataCenter: dataCenter!.name,
      pageNum,
      pageSize,
      keyword: debouncedSearchKeyword,
      products: selectedProducts,
      types: selectedLicenseTypes,
      statuses: selectedLicenseStatuses,
    } satisfies LicensesApiGetLicensesRequest
  })

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const rows: LicenseRow[] =
    licenseData?.licenses?.map((license) => ({
      ...license,
      id: license.serial,
    })) || []

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const { restoreDefault: restoreTopLicenseNaggingStore } =
    useTopLicenseNaggingStore()

  useEffect(() => {
    return () => {
      restoreTopLicenseNaggingStore()
    }
  }, [restoreTopLicenseNaggingStore])

  return (
    <CosGeneralPanel topic="License">
      <div className="flex flex-col gap-y-6 pt-2">
        <LicenseActions onImportLicenseSuccess={fetchLicenses} />
        <CosStroke type="dot" />
        <div className="flex flex-col gap-y-2">
          <h5 className="primary-h5 text-functional-text">License</h5>
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
  )
}
