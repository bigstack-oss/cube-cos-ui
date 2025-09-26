import { FirmwaresApiListFirmwareUpdatableNodesRequest } from '@cube-frontend/api'
import { CosCheckbox, GetCosBasicTable } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ChangeEventHandler, useContext, useMemo } from 'react'
import { toUpdatableNodeRow, UpdatableNodeRow } from './updateActionUtils'

type FirmwareUpdatableNodesProps = {
  version: string
  isRollingChecked: boolean
  onIsRollingChange: ChangeEventHandler<HTMLInputElement>
}

const UpdatableNodeTable = GetCosBasicTable<UpdatableNodeRow>()

export const FirmwareUpdatableNodes = (props: FirmwareUpdatableNodesProps) => {
  const { version, isRollingChecked, onIsRollingChange } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: updatableNodes } = useCosGetRequest(
    firmwaresApi.listFirmwareUpdatableNodes,
    (): FirmwaresApiListFirmwareUpdatableNodesRequest => ({
      dataCenter: dataCenter!.name,
      version,
    }),
  )

  const rows = useMemo<UpdatableNodeRow[]>(
    () => (updatableNodes ?? []).map(toUpdatableNodeRow),
    [updatableNodes],
  )

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        Do you want to update <b className="font-semibold">{version}</b> on the
        following nodes:
      </div>
      <UpdatableNodeTable isLoading={isLoading} rows={rows}>
        <UpdatableNodeTable.Column label="Host" property="name" />
        <UpdatableNodeTable.Column
          label="(Active) Firmware version"
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.active}
        </UpdatableNodeTable.Column>
        <UpdatableNodeTable.Column
          label="(Inactive) Firmware version"
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.inactive}
        </UpdatableNodeTable.Column>
      </UpdatableNodeTable>
      <div className="flex items-start gap-x-2">
        <CosCheckbox
          containerClassName="items-start"
          label="Rolling update — each node will be updated one by one. If any node is
          currently hosting running VMs, they will be automatically evacuated
          before the update to avoid service disruption."
          labelClassName="max-w-none"
          checked={isRollingChecked}
          onChange={onIsRollingChange}
        />
      </div>
    </div>
  )
}
