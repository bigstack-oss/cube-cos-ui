import { GetNodesResponseData } from '@cube-frontend/api'
import { CosModal, GetCosBasicTable } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'

const BasicHostTable = GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export type HardwareSerialNumberModalProps = {
  isOpen: boolean
  onCloseClick: () => void
}

export const HardwareSerialNumberModal = (
  props: HardwareSerialNumberModalProps,
) => {
  const { isOpen, onCloseClick } = props

  const dataCenter = useContext(DataCenterContext)

  const handleCopySerialNumber = () => {
    // TODO
  }

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      return {
        dataCenter: dataCenter.name,
        // pageNum,
        // pageSize,

        // TODO: add keyword search and roles filter.
        // @ts-expect-error: the API not supported yet.
        // roles: selectedRoles,
        // keyword: debouncedSearchKeyword,
      } satisfies NodesApiGetNodesRequest
    },
  )

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
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 text-functional-text">
          Do you want to create support files from these nodes?
        </p>
        <BasicHostTable rows={nodesData?.nodes || []} isLoading={isLoading}>
          <BasicHostTable.Column label="Host" property="hostname" />
          <BasicHostTable.Column label="Hardware serial" property="license">
            {(license) => license.serial}
          </BasicHostTable.Column>
          <BasicHostTable.Column label="Role" property="role" />
          <BasicHostTable.Column label="Product" property="license">
            {(license) => license.product.name}
          </BasicHostTable.Column>
          <BasicHostTable.Column label="Status" property="license">
            {(license) => {
              return license.status.current
            }}
          </BasicHostTable.Column>
        </BasicHostTable>
      </div>
    </CosModal>
  )
}
