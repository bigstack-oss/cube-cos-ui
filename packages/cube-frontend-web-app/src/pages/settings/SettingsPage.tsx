import { SettingsApiGetSettingsRequest } from '@cube-frontend/api'
import { CosStroke } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'
import { EmailSettings } from './_components/email/EmailSettings'
import { SlackChannels } from './_components/SlackChannels/SlackChannels'
import { ManageContact } from './ManageContact'
import { SettingsSection } from './SettingsSection'

export const SettingsPage = () => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: settingsData } = useCosGetRequest(
    settingsApi.getSettings,
    (): SettingsApiGetSettingsRequest => ({
      dataCenter,
    }),
  )

  return (
    <div className="flex flex-col gap-y-3">
      <ManageContact
        isLoading={isLoading}
        initialTitlePrefix={settingsData?.titlePrefix}
      />
      <SettingsSection className="py-6">
        <SlackChannels
          isLoading={isLoading}
          initialChannels={settingsData?.slack.channels}
        />
        <CosStroke className="my-4" type="dot" />
        <EmailSettings
          isLoading={isLoading}
          initialData={settingsData?.email}
        />
      </SettingsSection>
    </div>
  )
}
