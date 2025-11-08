import { useMemo, useState } from 'react'
import {
  GetTriggerMaterialsResponseDataResponse,
  GetTriggerMaterialsResponseDataResponseEmailsInner,
  GetTriggerMaterialsResponseDataResponseSlacksInner,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosStroke,
  CosTableRow,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import {
  isResponseValid,
  UpsertTriggersPayload,
} from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersStackCard } from '../TriggersStackCard'
import { SendNotificationModal } from './SendNotificationModal/SendNotificationModal'
import { PersonalizedScriptModal } from './PersonalizedScriptModal/PersonalizedScriptModal'
import { useTranslation } from 'react-i18next'

export type EmailRecipientTableRow =
  GetTriggerMaterialsResponseDataResponseEmailsInner & CosTableRow

export type SlackChannelTableRow =
  GetTriggerMaterialsResponseDataResponseSlacksInner & CosTableRow

const mapToEmailRecipientTable = (
  email: GetTriggerMaterialsResponseDataResponseEmailsInner,
): EmailRecipientTableRow => ({
  ...email,
  id: email.address,
})

const mapToSlackChannelTable = (
  slack: GetTriggerMaterialsResponseDataResponseSlacksInner,
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
  isResponseChanged: boolean
  payload: UpsertTriggersPayload
  response: GetTriggerMaterialsResponseDataResponse
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onScriptChange: (file: TriggerResponseScript) => void
  onScriptRemove: () => void
  onNextClick: () => void
  onResetClick: () => void
}

export const SetResponse = (props: SetResponseProps) => {
  const {
    isLoading,
    isResponseChanged,
    payload,
    response,
    onEmailSelect,
    onSlackSelect,
    onScriptChange,
    onScriptRemove,
    onNextClick,
    onResetClick,
  } = props

  const { scriptType, emails, slacks } = response

  const { t } = useTranslation()

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
        title={t('events.triggers.upsert.notification')}
        tags={notifications}
        onEditClick={onSendNotificationButtonClick}
        onRemoveClick={onNotificationRemove}
      />
    )
  }

  const renderPersonalizedScriptStackCard = () => {
    if (!payload.script?.name && !payload.script?.content) return null
    return (
      <TriggersStackCard
        title={t('events.triggers.upsert.personalizedScript')}
        tags={[payload.script.name]}
        onEditClick={onPersonalizedScriptButtonClick}
        onRemoveClick={onScriptRemove}
      />
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <CosGeneralPanel>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4">
            <div className="flex flex-wrap items-center gap-x-4">
              <CosButton
                type="ghost"
                usage="icon-left"
                Icon={AddSquare}
                onClick={() => setIsSendNotificationOpen(true)}
              >
                {t('events.triggers.upsert.sendNotification')}
              </CosButton>
              <CosButton
                type="ghost"
                usage="icon-left"
                Icon={AddSquare}
                onClick={() => setIsPersonalizedScriptOpen(true)}
                disabled={!!payload.script?.content || !!payload.script?.name}
              >
                {t('events.triggers.upsert.personalizedScript')}
              </CosButton>
            </div>
            <CosButton
              type="ghost"
              onClick={onResetClick}
              disabled={!isResponseChanged}
            >
              {t('events.triggers.upsert.reset')}
            </CosButton>
          </div>
          <CosStroke />
          {renderNotificationStackCard()}
          {renderPersonalizedScriptStackCard()}
        </div>
      </CosGeneralPanel>
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
          {t('events.triggers.upsert.next')}
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
        scriptType={scriptType}
        onScriptChange={onScriptChange}
        onModalClose={() => setIsPersonalizedScriptOpen(false)}
      />
    </div>
  )
}
