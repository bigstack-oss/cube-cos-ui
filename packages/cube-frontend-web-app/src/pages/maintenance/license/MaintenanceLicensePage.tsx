import { useContext, useState } from 'react'
import {
  GetLicensesResponseDataLicensesInner,
  LicensesApiGetLicensesRequest,
} from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosStroke,
  CosTableRow,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { HardwareSerialNumberModal } from './_components/HardwareSerialNumberModal'

type LicenseRow = GetLicensesResponseDataLicensesInner & CosTableRow

const LicenseTable = GetCosBasicTable<LicenseRow>()

export const MaintenanceLicensePage = () => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { data: licenseData, isLoading } = useCosGetRequest(
    licenseApi.getLicenses,
    () => {
      return {
        dataCenter,
        // TODO: handle pagination
      } satisfies LicensesApiGetLicensesRequest
    },
  )

  const handleButtonClick = () => {
    // TODO
  }

  const rows: LicenseRow[] =
    licenseData?.licenses?.map((license) => ({
      ...license,
      id: license.serial,
    })) || []

  const [isHardwareSerialModalOpen, setIsHardwareSerialModalOpen] =
    useState(false)

  return (
    <>
      <CosGeneralPanel topic="License">
        <div className="flex flex-col gap-y-6 pt-2">
          <div className="flex items-center gap-x-4">
            <CosButton>Import License</CosButton>
            <div className="flex gap-x-2">
              <WarningFilled
                className="icon-md-sm text-status-negative"
                onClick={handleButtonClick}
              />
              <span className="primary-body4 text-functional-text">
                Invalid files.
              </span>
            </div>
            <CosButton onClick={() => setIsHardwareSerialModalOpen(true)}>
              Get hardware serials
            </CosButton>
          </div>
          <CosStroke type="dot" />
          <div>
            <LicenseTable rows={rows} isLoading={isLoading}>
              <LicenseTable.Column label="Product" property="product">
                {(product) => product.name}
              </LicenseTable.Column>
              <LicenseTable.Column label="License name" property="hostname" />
              <LicenseTable.Column label="Hosts" property="hostname">
                {/* {(hostname) => hostname.join(', ')} */}
              </LicenseTable.Column>
              <LicenseTable.Column label="Issue date" property="License Name" />
              <LicenseTable.Column
                label="Expire date"
                property="License Name"
              />
              <LicenseTable.Column label="Expired" property="License Name" />
              <LicenseTable.Column label="Type" property="type" />
            </LicenseTable>
          </div>
        </div>
      </CosGeneralPanel>
      <HardwareSerialNumberModal
        isOpen={isHardwareSerialModalOpen}
        onCloseClick={() => setIsHardwareSerialModalOpen(false)}
      />
    </>
  )
}
