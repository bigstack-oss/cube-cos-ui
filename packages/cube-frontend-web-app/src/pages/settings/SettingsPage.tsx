import { SettingsApiGetSettingsRequest } from '@cube-frontend/api'
import { CosStroke } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useContext } from 'react'
import { EmailSettings } from './_components/email/EmailSettings'
import { SlackChannels } from './_components/SlackChannels/SlackChannels'
import { ManageContact } from './ManageContact'
import { SettingsSection } from './SettingsSection'

const SETTINGS_POLLING_INTERVAL = 5 * 1000

export const SettingsPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data: settingsData,
    isLoading,
    hasResponseBeenReceived,
    getResource: getSettings,
  } = useCosGetRequest(
    settingsApi.getSettings,
    (): SettingsApiGetSettingsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { isPolling } = usePolling(getSettings, SETTINGS_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return (
    <div className="flex flex-col gap-y-3">
      <ManageContact titlePrefixFromApi={settingsData?.titlePrefix} />
      <SettingsSection className="py-6">
        <SlackChannels
          isLoading={showLoading}
          initialChannels={settingsData?.slack.channels}
        />
        <CosStroke className="my-4" type="dot" />
        <EmailSettings
          isLoading={showLoading}
          dataFromApi={settingsData?.email}
        />
      </SettingsSection>
    </div>
  )
}
