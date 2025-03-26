import { CosModal } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useState } from 'react'
import { ProductItem } from '../LicenseFilters/ProductFilter'
import { HostLicenseTable } from './HostLicenseTable'
import { HostLicenseFilters } from './HostLicenseFilters'
import { Role } from '@cube-frontend/web-app/utils/role'
import { LicenseStatus } from '../LicenseFilters/StatusFilter'
import { NodesApiGetNodesRequest } from '@cube-frontend/api'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { ProductDropdown } from './ProductDropdown'

export type HardwareSerialNumberModalProps = {
  isOpen: boolean
  onCloseClick: () => void
}

export const HardwareSerialNumberModal = (
  props: HardwareSerialNumberModalProps,
) => {
  const { isOpen, onCloseClick } = props

  const dataCenter = useContext(DataCenterContext)

  const [selectedProduct, setSelectedProduct] = useState<ProductItem>()

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [selectedLicenseStatuses, setSelectedLicenseStatuses] = useState<
    LicenseStatus[]
  >([])

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      if (!selectedProduct) {
        return
      }

      return {
        dataCenter: dataCenter.name,

        // TODO: add keyword search and roles filter.
        // @ts-expect-error: the API not supported yet.
        products: [selectedProduct.name],
        keyword: debouncedSearchKeyword,
        roles: selectedRoles,
        licenseStatuses: selectedLicenseStatuses,
        // pageNum,
        // pageSize,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const handleCopySerialNumber = () => {
    // TODO
  }

  return (
    <CosModal
      title="Get Hardware Serial Number"
      size="sm"
      isOpen={isOpen}
      actionText="Copy to clipboard"
      actionButtonProps={{ disabled: true }}
      onActionClick={handleCopySerialNumber}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-8">
        <div className="w-fit">
          <ProductDropdown
            selectedProduct={selectedProduct}
            handleProductSelect={setSelectedProduct}
          />
        </div>
        {selectedProduct && (
          <div className="flex flex-col gap-y-5">
            <HostLicenseFilters
              searchKeyword={searchKeyword}
              handleSearchKeywordChange={setSearchKeyword}
              handleSearchKeywordClear={handleSearchKeywordClear}
              selectedLicenseStatuses={selectedLicenseStatuses}
              handleLicenseStatusesSelect={setSelectedLicenseStatuses}
              selectedRoles={selectedRoles}
              handleRolesSelect={setSelectedRoles}
            />
            <HostLicenseTable
              rows={nodesData?.nodes || []}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </CosModal>
  )
}
