import { useMemo, useState } from 'react'
import {
  EmailRecipientResponse,
  SlackChannelGetResponse,
} from '@cube-frontend/api'
import { CosButton, CosStroke, CosTableRow } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersStackCard } from '../TriggersStackCard'
import { SendNotificationModal } from './SendNotificationModal/SendNotificationModal'
import { PersonalizedScriptModal } from './PersonalizedScriptModal/PersonalizedScriptModal'

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

const payloadToNotification = (
  emails: string[],
  slacks: string[],
): string[] => {
  return [...emails, ...slacks]
}

export type SetResponseProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload
  emails: EmailRecipientResponse[]
  slacks: SlackChannelGetResponse[]
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SetResponse = (props: SetResponseProps) => {
  const {
    isLoading,
    payload,
    emails,
    slacks,
    onEmailSelect,
    onSlackSelect,
    onNextClick,
    onResetClick,
  } = props

  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false)

  const [isPersonalizedScriptOpen, setIsPersonalizedScriptOpen] =
    useState(false)

  const emailRows = useMemo<EmailRecipientTableRow[]>(() => {
    return emails.map(mapToEmailRecipientTable)
  }, [emails])

  const slackRows = useMemo<SlackChannelTableRow[]>(() => {
    return slacks.map(mapToSlackChannelTable)
  }, [slacks])

  const notifications = payloadToNotification(payload.emails, payload.slacks)

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    if (notifications.length === 0) return false
    return true
  }, [notifications])

  const renderNotificationStackCard = () => {
    if (notifications.length === 0) return null

    const removeNotification = () => {
      onEmailSelect([])
      onSlackSelect([])
    }

    return (
      <TriggersStackCard
        title="Notification"
        tags={notifications}
        onRemoveClick={removeNotification}
      />
    )
  }

  const renderPersonalizedScriptStackCard = () => {
    return (
      <TriggersStackCard
        title="Personalized Script"
        tags={['response', 'response', 'response', 'response']}
        onRemoveClick={() => window.alert('Remove!!!')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <SendNotificationModal
              isLoading={isLoading}
              isModalOpen={isSendNotificationOpen}
              emailRows={emailRows}
              slackRows={slackRows}
              selectedEmails={payload.emails}
              selectedSlacks={payload.slacks}
              onEmailSelect={onEmailSelect}
              onSlackSelect={onSlackSelect}
              onModelOpen={() => setIsSendNotificationOpen(true)}
              onModelClose={() => setIsSendNotificationOpen(false)}
            />
            <PersonalizedScriptModal
              isModalOpen={isPersonalizedScriptOpen}
              onModelOpen={() => setIsPersonalizedScriptOpen(true)}
              onModelClose={() => setIsPersonalizedScriptOpen(false)}
              onActionClick={() => alert('Personalized Script Set!!')}
            />
          </div>
          <CosButton
            type="ghost"
            onClick={onResetClick}
            disabled={!isValueValid}
          >
            Reset
          </CosButton>
        </div>
        <CosStroke />
        {renderNotificationStackCard()}
        {renderPersonalizedScriptStackCard()}
      </StepBoard>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          className="self-start"
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!isValueValid}
          onClick={onNextClick}
        >
          Next
        </CosButton>
      </div>
    </div>
  )
}
