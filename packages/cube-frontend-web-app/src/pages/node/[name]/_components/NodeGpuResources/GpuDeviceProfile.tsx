import { useTranslation } from 'react-i18next'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'
import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'

type DeviceProfileRow = {
  id: string
  aliasName: string
}

const DeviceProfileInfoTable = GetInfoTable<DeviceProfileRow>()

export type GpuDeviceProfileProps = {
  deviceProfile: string | null
}

/**
 * The Cyborg device profile a flavor's `accel:device_profile` has to name to be
 * scheduled onto this card. Only a pgpu card has one — a vGPU card is scheduled
 * through the PCI alias its profiles table already shows — so the API reports
 * `null` on every other resource type, and on a pgpu card whose profile does not
 * exist yet or could not be looked up.
 *
 * The block takes the profiles table's own title and shape, because it is what
 * the card's Profiles / ID section holds: a pgpu card carries exactly one such
 * name, and the operator reads it in the same place on every card.
 *
 * Nothing renders on `null`. The name is the whole point of the block, and the
 * API gives no reason for its absence, so a label with no value would tell the
 * operator neither what to paste nor why it is missing.
 */
export const GpuDeviceProfile = (props: GpuDeviceProfileProps) => {
  const { deviceProfile } = props

  const { t } = useTranslation()

  if (!deviceProfile) return null

  const rows: DeviceProfileRow[] = [
    { id: deviceProfile, aliasName: deviceProfile },
  ]

  return (
    <DeviceProfileInfoTable
      title={`${t('nodes.details.profilesIdList.title')} (${rows.length})`}
      rows={rows}
      isLoading={false}
      scrollBehavior="vertical"
    >
      <DeviceProfileInfoTable.Column
        label={t('nodes.details.profilesIdList.aliasName')}
        property="aliasName"
      >
        {(aliasName) => (
          <div className="flex flex-row items-center gap-x-4">
            <span>{aliasName}</span>
            <CopyButton copyContent={aliasName} />
          </div>
        )}
      </DeviceProfileInfoTable.Column>
    </DeviceProfileInfoTable>
  )
}
