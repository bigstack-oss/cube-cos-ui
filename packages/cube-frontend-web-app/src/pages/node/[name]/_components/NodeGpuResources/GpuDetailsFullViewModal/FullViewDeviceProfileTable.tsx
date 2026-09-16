import { useTranslation } from 'react-i18next'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'

type DeviceProfileRow = CosTableRow & {
  aliasName: string
}

const DeviceProfileTable = GetCosBasicTable<DeviceProfileRow>()

type FullViewDeviceProfileTableProps = {
  title: string
  deviceProfile: string
}

/**
 * The Profiles tab of a pgpu card. Such a card carries no profile list — it is
 * scheduled through the single Cyborg device profile a flavor names in
 * `accel:device_profile` — so the table holds that one name under the same
 * Alias Name column the card's own Profiles section shows, and needs neither a
 * second column nor pagination.
 */
export const FullViewDeviceProfileTable = (
  props: FullViewDeviceProfileTableProps,
) => {
  const { title, deviceProfile } = props

  const { t } = useTranslation()

  const rows: DeviceProfileRow[] = [
    { id: deviceProfile, aliasName: deviceProfile },
  ]

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 font-semibold text-functional-title">
        {title}
      </div>
      <DeviceProfileTable rows={rows}>
        <DeviceProfileTable.Column
          property="aliasName"
          label={t('nodes.details.profilesIdList.aliasName')}
        />
      </DeviceProfileTable>
    </div>
  )
}
