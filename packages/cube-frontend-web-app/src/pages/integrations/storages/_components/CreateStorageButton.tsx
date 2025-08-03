import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useNavigate } from 'react-router'
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
      {vendors?.map((v) => (
        <CosOverflowMenu.Item
          key={v.vendor}
          type="plain"
          title={v.vendor}
          onClick={() =>
            navigate(
              `${CosRoutesEnum.INTEGRATIONS_STORAGES_CREATE_PAGE}?defaultVendor=${v.vendor}`,
            )
          }
        />
      ))}
    </CosOverflowMenu>
  )
}
