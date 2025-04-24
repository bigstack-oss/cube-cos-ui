import { useContext, useState } from 'react'
import { isNil } from 'lodash'
import { twMerge } from 'tailwind-merge'
import { CosModal } from '@cube-frontend/ui-library'
import CheckIcon from '@cube-frontend/ui-library/icons/monochrome/checkmark.svg?react'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import {
  GetNodesProductsEnum,
  GetNodesRolesEnum,
  NodesApiGetNodesRequest,
  NodeLicenseCurrentStatus,
} from '@cube-frontend/api'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { HostLicenseTable } from './HostLicenseTable'
import { HostLicenseFilters } from './HostLicenseFilters'
import { ProductDropdown } from './ProductDropdown'
import { useCopySerialNumber } from './useCopySerialNumber'
import { useNodeSelection } from './useNodeSelection'

export type HardwareSerialNumberModalProps = {
  isOpen: boolean
  onCloseClick: () => void
}

export const HardwareSerialNumberModal = (
  props: HardwareSerialNumberModalProps,
) => {
  const { isOpen, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const [selectedProduct, setSelectedProduct] = useState<GetNodesProductsEnum>()
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedRoles, setSelectedRoles] = useState<GetNodesRolesEnum[]>([])
  const [selectedNodeLicenseStatuses, setSelectedNodeLicenseStatuses] =
    useState<NodeLicenseCurrentStatus[]>([])

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      return {
        dataCenter: dataCenter!.name,
        products: !isNil(selectedProduct) ? [selectedProduct] : undefined,
        keyword: debouncedSearchKeyword,
        roles: selectedRoles,
        licenseStatuses: selectedNodeLicenseStatuses,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const {
    selectedNodeIds,
    selectedNodes,
    handleAllCheckChange,
    handleRowCheckChange,
  } = useNodeSelection(nodesData)

  const { showCopySuccess, copySerialNumber } =
    useCopySerialNumber(selectedNodes)

  return (
    <CosModal
      className="min-w-[1000px]"
      title="Get Hardware Serial Number"
      footerMessage={
        showCopySuccess && (
          <div className="flex items-center gap-x-1 text-status-positive-text">
            <CheckIcon className="icon-md" />
            <span className="primary-body4">Copied to clipboard.</span>
          </div>
        )
      }
      size="sm"
      isOpen={isOpen}
      actionText="Copy to clipboard"
      actionButtonProps={{ disabled: selectedNodeIds.length === 0 }}
      onActionClick={copySerialNumber}
      onCloseClick={onCloseClick}
    >
      <div
        className={twMerge(
          'flex flex-col gap-y-8 overflow-auto',
          // Set a fixed height to prevent UI flickering caused by the table skeleton.
          selectedProduct && 'h-[400px]',
        )}
      >
        <div className="w-fit">
          <ProductDropdown
            selectedProduct={selectedProduct}
            handleProductSelect={setSelectedProduct}
          />
        </div>
        {selectedProduct && (
          <div className="flex flex-col gap-y-2">
            <h5 className="primary-h5 text-functional-text">Hosts</h5>
            <HostLicenseFilters
              searchKeyword={searchKeyword}
              handleSearchKeywordChange={setSearchKeyword}
              handleSearchKeywordClear={handleSearchKeywordClear}
              selectedNodeLicenseStatuses={selectedNodeLicenseStatuses}
              handleNodeLicenseStatusesSelect={setSelectedNodeLicenseStatuses}
              selectedRoles={selectedRoles}
              handleRolesSelect={setSelectedRoles}
            />
            <HostLicenseTable
              rows={nodesData?.nodes || []}
              isLoading={isLoading}
              selectedRowIds={selectedNodeIds}
              showHeaderCheckbox={true}
              onCheckChange={handleRowCheckChange}
              onAllCheckChange={handleAllCheckChange}
            />
          </div>
        )}
      </div>
    </CosModal>
  )
}
