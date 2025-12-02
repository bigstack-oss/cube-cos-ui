import { ChangeEventHandler, useContext, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FirmwaresApiListFirmwareUpdatableNodesRequest } from '@cube-frontend/api'
import { CosCheckbox, GetCosBasicTable } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { toUpdatableNodeRow, UpdatableNodeRow } from './updateActionUtils'

type FirmwareUpdatableNodesProps = {
  version: string
  isRollingChecked: boolean
  isRollingCheckboxDisabled: boolean
  onIsRollingChange: ChangeEventHandler<HTMLInputElement>
}

const UpdatableNodeTable = GetCosBasicTable<UpdatableNodeRow>()

export const FirmwareUpdatableNodes = (props: FirmwareUpdatableNodesProps) => {
  const {
    version,
    isRollingChecked,
    isRollingCheckboxDisabled,
    onIsRollingChange,
  } = props

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

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.firmware.updateModal.topMessage.confirmUpdate"
          values={{ firmware: version }}
          components={{ bold: <b className="font-semibold" /> }}
        />
      </div>
      <UpdatableNodeTable isLoading={isLoading} rows={rows}>
        <UpdatableNodeTable.Column
          label={t('maintenance.update.firmware.updateModal.host')}
          property="name"
        />
        <UpdatableNodeTable.Column
          label={t(
            'maintenance.update.firmware.updateModal.activeFirmwareVersion',
          )}
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.active}
        </UpdatableNodeTable.Column>
        <UpdatableNodeTable.Column
          label={t(
            'maintenance.update.firmware.updateModal.inactiveFirmwareVersion',
          )}
          property="firmware"
          emphasize={true}
        >
          {(firmware) => firmware.inactive}
        </UpdatableNodeTable.Column>
      </UpdatableNodeTable>
      <div className="flex items-start gap-x-2">
        <CosCheckbox
          containerClassName="items-start"
          label={t(
            'maintenance.update.firmware.updateModal.rollingUpdateCheckbox',
          )}
          labelClassName="max-w-none"
          checked={isRollingChecked}
          disabled={isRollingCheckboxDisabled}
          onChange={onIsRollingChange}
        />
      </div>
    </div>
  )
}
