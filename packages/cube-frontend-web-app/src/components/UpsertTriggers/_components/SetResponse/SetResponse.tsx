import { useMemo, useState } from 'react'
import {
  GetTriggerMaterialsResponseDataResponseNotificationsEmailsInner,
  GetTriggerMaterialsResponseDataResponseNotificationsSlacksInner,
} from '@cube-frontend/api'
import { CosButton, CosStroke, CosTableRow } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard'
import {
  isResponseValid,
  ScriptFile,
  TriggerResponses,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersStackCard } from '../TriggersStackCard'
import { SendNotificationModal } from './SendNotificationModal/SendNotificationModal'
import { PersonalizedScriptModal } from './PersonalizedScriptModal/PersonalizedScriptModal'

export type EmailRecipientTableRow =
  GetTriggerMaterialsResponseDataResponseNotificationsEmailsInner & CosTableRow

export type SlackChannelTableRow =
  GetTriggerMaterialsResponseDataResponseNotificationsSlacksInner & CosTableRow

const mapToEmailRecipientTable = (
  email: GetTriggerMaterialsResponseDataResponseNotificationsEmailsInner,
): EmailRecipientTableRow => ({
  ...email,
  id: email.address,
})

const mapToSlackChannelTable = (
  slack: GetTriggerMaterialsResponseDataResponseNotificationsSlacksInner,
): SlackChannelTableRow => ({
  ...slack,
  id: slack.url,
})

const payloadToNotificationDisplay = (
  emailRows: EmailRecipientTableRow[],
  slackRows: SlackChannelTableRow[],
): string[] => {
  const emailAddresses = emailRows.map((row) => row.address)
  const slackNames = slackRows.map((row) => row.name)

  return [...emailAddresses, ...slackNames]
}

export type SetResponseProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload
  responses: TriggerResponses
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: ScriptFile) => void
  onScriptRemove: () => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SetResponse = (props: SetResponseProps) => {
  const {
    isLoading,
    payload,
    responses,
    onEmailSelect,
    onSlackSelect,
    onScriptChange,
    onScriptRemove,
    onNextClick,
    onResetClick,
  } = props

  const { emails, slacks, scriptTypes } = responses

  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false)

  const [isPersonalizedScriptOpen, setIsPersonalizedScriptOpen] =
    useState(false)

  const emailRows = useMemo<EmailRecipientTableRow[]>(() => {
    return emails.map(mapToEmailRecipientTable)
  }, [emails])

  const slackRows = useMemo<SlackChannelTableRow[]>(() => {
    return slacks.map(mapToSlackChannelTable)
  }, [slacks])

  const notifications = payloadToNotificationDisplay(
    payload.emails,
    payload.slacks,
  )

  const isValueValid = useMemo(() => isResponseValid(payload), [payload])

  const onSendNotificationButtonClick = () => {
    setIsSendNotificationOpen(true)
  }

  const onPersonalizedScriptButtonClick = () => {
    setIsPersonalizedScriptOpen(true)
  }

  const renderNotificationStackCard = () => {
    if (notifications.length === 0) return null

    const onNotificationRemove = () => {
      onEmailSelect([])
      onSlackSelect([])
    }

    return (
      <TriggersStackCard
        title="Notification"
        tags={notifications}
        onEditClick={onSendNotificationButtonClick}
        onRemoveClick={onNotificationRemove}
      />
    )
  }

  const renderPersonalizedScriptStackCard = () => {
    if (!payload.script) return null
    return (
      <TriggersStackCard
        title="Personalized Script"
        tags={[payload.script.fileName]}
        onEditClick={onPersonalizedScriptButtonClick}
        onRemoveClick={onScriptRemove}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <CosButton
              type="ghost"
              usage="icon-left"
              Icon={AddSquare}
              onClick={() => setIsSendNotificationOpen(true)}
            >
              Send Notification
            </CosButton>
            <CosButton
              type="ghost"
              usage="icon-left"
              Icon={AddSquare}
              onClick={() => setIsPersonalizedScriptOpen(true)}
            >
              Personalized Script
            </CosButton>
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
      <SendNotificationModal
        isLoading={isLoading}
        isModalOpen={isSendNotificationOpen}
        payload={payload}
        emailRows={emailRows}
        slackRows={slackRows}
        onEmailSelect={onEmailSelect}
        onSlackSelect={onSlackSelect}
        onModalClose={() => setIsSendNotificationOpen(false)}
      />
      <PersonalizedScriptModal
        isModalOpen={isPersonalizedScriptOpen}
        payload={payload}
        scriptTypes={scriptTypes}
        onScriptChange={onScriptChange}
        onModalClose={() => setIsPersonalizedScriptOpen(false)}
      />
    </div>
  )
}
