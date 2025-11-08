import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LicensesApiGetLicensesRequest } from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosPagination,
  CosStroke,
} from '@cube-frontend/ui-library'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { LicenseFilters } from './_components/LicenseFilters/LicenseFilters'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { LicenseRow, LicenseTable } from './_components/LicenseTable'
import { useTopLicenseNaggingStore } from '@cube-frontend/web-app/stores/topLicenseNaggingStore'
import { LicenseActions } from './_components/LicenseActions/LicenseActions'
import { useLicenseListQuery } from './_components/useLicenseListQuery'

export const MaintenanceLicensePage = () => {
  const { dataCenter, fetchDataCenters } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const {
    query,
    onKeywordChange,
    onProductsChange,
    onStatusesChange,
    onTypesChange,
    onPageChange,
    onItemsPerPageChange,
  } = useLicenseListQuery()

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    query.keyword,
    300,
  )
  const handleSearchKeywordClear = () => {
    onKeywordChange('')
    setDebounceSearchKeyword('')
  }

  const {
    data: licenseData,
    isLoading,
    getResource: fetchLicenses,
  } = useCosGetRequest(licenseApi.getLicenses, () => {
    return {
      dataCenter: dataCenter!.name,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
      keyword: debouncedSearchKeyword,
      products: query.products,
      types: query.types,
      statuses: query.statuses,
    } satisfies LicensesApiGetLicensesRequest
  })

  const handleLicenseImportSuccess = () => {
    fetchLicenses()
    fetchDataCenters!()
  }

  const rows: LicenseRow[] =
    licenseData?.licenses?.map((license) => ({
      ...license,
      id: license.serial,
    })) || []

  const { restoreDefault: restoreTopLicenseNaggingStore } =
    useTopLicenseNaggingStore()

  useEffect(() => {
    return () => {
      restoreTopLicenseNaggingStore()
    }
  }, [restoreTopLicenseNaggingStore])

  return (
    <CosGeneralPanel topic={t('maintenance.license.title')}>
      <div className="flex flex-col gap-y-6 pt-2">
        <LicenseActions onImportLicenseSuccess={handleLicenseImportSuccess} />
        <CosStroke type="dot" />
        <div className="flex flex-col gap-y-2">
          <h5 className="primary-h5 text-functional-text">
            {t('maintenance.license.title')}
          </h5>
          <LicenseFilters
            searchKeyword={query.keyword}
            handleSearchKeywordChange={onKeywordChange}
            handleSearchKeywordClear={handleSearchKeywordClear}
            selectedProducts={query.products}
            handleProductsSelect={onProductsChange}
            selectedLicenseStatuses={query.statuses}
            handleLicenseStatusesSelect={onStatusesChange}
            selectedLicenseTypes={query.types}
            handleLicenseTypesSelect={onTypesChange}
          />
          <LicenseTable
            rows={rows}
            isLoading={isLoading}
            skeletonRowCount={query.itemsPerPage}
          />
        </div>
        <CosPagination
          isLoading={isLoading}
          totalItems={licenseData?.page?.totalItemCount ?? 0}
          currentPage={query.currentPage}
          itemsPerPage={query.itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </CosGeneralPanel>
  )
}
