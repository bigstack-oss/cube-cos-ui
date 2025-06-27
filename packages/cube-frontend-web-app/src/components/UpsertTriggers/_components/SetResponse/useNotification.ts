import {
  EmailRecipientResponse,
  SettingsApiGetEmailRecipientsRequest,
  SettingsApiGetSlackChannelsRequest,
  SlackChannelGetResponse,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useMemo, useState } from 'react'

export type EmailRecipientTableRow = EmailRecipientResponse & CosTableRow

export type SlackChannelTableRow = SlackChannelGetResponse & CosTableRow

const mapToEmailRecipientTable = (
  email: EmailRecipientResponse,
): EmailRecipientTableRow => ({
  ...email,
  id: email.address,
})

const mapToSlackChannelTable = (
  slack: SlackChannelGetResponse,
): SlackChannelTableRow => ({
  ...slack,
  id: slack.url,
})

type UseNotification = {
  isEmailsLoading: boolean
  isSlacksLoading: boolean
  emailRows: EmailRecipientTableRow[]
  slackRows: SlackChannelTableRow[]
  selectedEmails: string[]
  selectedSlacks: string[]
  onEmailSelect: (email: string) => void
  onSlackSelect: (slack: string) => void
}

export const useNotification = (): UseNotification => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedSlacks, setSelectedSlacks] = useState<string[]>([])

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading: isEmailsLoading, data: emailRecipientsFromApi = [] } =
    useCosGetRequest(
      settingsApi.getEmailRecipients,
      (): SettingsApiGetEmailRecipientsRequest => ({
        dataCenter: dataCenter!.name,
      }),
    )

  const { isLoading: isSlacksLoading, data: slackChannelsFromApi = [] } =
    useCosGetRequest(
      settingsApi.getSlackChannels,
      (): SettingsApiGetSlackChannelsRequest => ({
        dataCenter: dataCenter!.name,
      }),
    )

  const emailRows = useMemo<EmailRecipientTableRow[]>(() => {
    return emailRecipientsFromApi.map(mapToEmailRecipientTable)
  }, [emailRecipientsFromApi])

  const slackRows = useMemo<SlackChannelTableRow[]>(() => {
    return slackChannelsFromApi.map(mapToSlackChannelTable)
  }, [slackChannelsFromApi])

  const onEmailSelect = (email: string) => {
    const isSelected = selectedEmails.includes(email)
    setSelectedEmails((prev) =>
      isSelected ? prev.filter((e) => e !== email) : [...prev, email],
    )
  }

  const onSlackSelect = (slack: string) => {
    const isSelected = selectedSlacks.includes(slack)
    setSelectedSlacks((prev) =>
      isSelected ? prev.filter((e) => e !== slack) : [...prev, slack],
    )
  }

  return {
    isEmailsLoading,
    isSlacksLoading,
    emailRows,
    slackRows,
    selectedEmails,
    selectedSlacks,
    onEmailSelect,
    onSlackSelect,
  }
}
