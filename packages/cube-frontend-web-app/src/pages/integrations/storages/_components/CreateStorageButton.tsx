import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { createSearchParams, useNavigate } from 'react-router'
import { DEFAULT_VENDOR_QUERY_KEY } from '../storageUtils'
import { useStorageVendors } from './useStorageVendors'
import PlusIcon from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'

export const CreateStorageButton = () => {
  const navigate = useNavigate()

  const { data: vendors, isLoading: isLoadingVendors } = useStorageVendors()

  return (
    <CosOverflowMenu
      triggerElement={
        <CosButton
          type="primary"
          usage="icon-left"
          size="sm"
          loading={isLoadingVendors}
          Icon={PlusIcon}
        >
          Add external storage
        </CosButton>
      }
    >
      <CosOverflowMenu.Title>Choose Vendor</CosOverflowMenu.Title>
      {vendors?.map((vendor) => (
        <CosOverflowMenu.Item
          key={vendor}
          type="plain"
          title={vendor}
          onClick={() =>
            navigate({
              pathname: CosRoutesEnum.INTEGRATIONS_STORAGES_CREATE_PAGE,
              search: createSearchParams({
                [DEFAULT_VENDOR_QUERY_KEY]: vendor,
              }).toString(),
            })
          }
        />
      ))}
    </CosOverflowMenu>
  )
}
