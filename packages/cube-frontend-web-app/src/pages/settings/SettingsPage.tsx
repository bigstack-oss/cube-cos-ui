import { SettingsApiGetSettingsRequest } from '@cube-frontend/api'
import { CosStroke } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { useContext } from 'react'
import { EmailSettings } from './_components/email/EmailSettings'
import { SlackChannels } from './_components/SlackChannels/SlackChannels'
import { ManageContact } from './ManageContact'
import { SettingsSection } from './SettingsSection'

export const SettingsPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: settingsData, getResource: getSettings } = useCosGetRequest(
    settingsApi.getSettings,
    (): SettingsApiGetSettingsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  useSequentialInterval(getSettings, 5000, {
    immediate: false,
  })

  return (
    <div className="flex flex-col gap-y-3">
      <ManageContact titlePrefixFromApi={settingsData?.titlePrefix} />
      <SettingsSection className="py-6">
        <SlackChannels
          isLoading={!settingsData}
          initialChannels={settingsData?.slack.channels}
        />
        <CosStroke className="my-4" type="dot" />
        <EmailSettings
          isLoading={!settingsData}
          dataFromApi={settingsData?.email}
        />
      </SettingsSection>
    </div>
  )
}
