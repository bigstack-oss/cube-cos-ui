import {
  GetNodesProductsEnum,
  GetNodesRolesEnum,
  LicensesApiGetLicenseAttachmentsRequest,
  NodeLicenseCurrentStatus,
} from '@cube-frontend/api'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { useContext, useMemo, useState } from 'react'
import { mapToTableRows } from '../../utils'

const DEFAULT_PRODUCT = GetNodesProductsEnum.CubeCos

export const useLicenseAttachmentTable = (isOpen: boolean) => {
  const { dataCenter } = useContext(DataCenterContext)

  const [selectedProduct, setSelectedProduct] =
    useState<GetNodesProductsEnum>(DEFAULT_PRODUCT)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedRoles, setSelectedRoles] = useState<GetNodesRolesEnum[]>([])
  const [selectedNodeLicenseStatuses, setSelectedNodeLicenseStatuses] =
    useState<NodeLicenseCurrentStatus[]>([])

  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const { data: licenseAttachments, isLoading } = useCosGetRequest(
    licenseApi.getLicenseAttachments,
    () => {
      if (!isOpen) {
        return
      }

      return {
        dataCenter: dataCenter!.name,
        product: selectedProduct,
        keyword: debouncedSearchKeyword,
        roles: selectedRoles,
        statuses: selectedNodeLicenseStatuses,
      } satisfies LicensesApiGetLicenseAttachmentsRequest
    },
  )

  const rows = useMemo(
    () => mapToTableRows(licenseAttachments),
    [licenseAttachments],
  )

  const clearKeyword = () => {
    setSearchKeyword('')
    setDebouncedSearchKeyword('')
  }

  const resetFilters = () => {
    setSelectedProduct(DEFAULT_PRODUCT)
    clearKeyword()
    setSelectedRoles([])
    setSelectedNodeLicenseStatuses([])
  }

  return {
    isLoading,
    rows,
    searchKeyword,
    selectedProduct,
    selectedRoles,
    selectedNodeLicenseStatuses,
    debouncedSearchKeyword,
    setSelectedProduct,
    setSearchKeyword,
    setSelectedRoles,
    setSelectedNodeLicenseStatuses,
    clearKeyword,
    resetFilters,
  }
}
