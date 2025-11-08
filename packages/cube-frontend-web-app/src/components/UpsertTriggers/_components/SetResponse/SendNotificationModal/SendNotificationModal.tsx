import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { isEqual } from 'lodash'
import xor from 'lodash/xor'
import { CosContentSwitcher, CosModal } from '@cube-frontend/ui-library'
import { UpsertTriggersPayload } from '../../../upsertTriggersUtils'
import { EmailRecipientTableRow, SlackChannelTableRow } from '../SetResponse'
import { EmailBatchActionTable } from './EmailBatchActionTable'
import { SlackBatchActionTable } from './SlackBatchActionTable'
import { useTranslation } from 'react-i18next'

type NotificationTab = 'Email' | 'Slack'

type TriggerNotifications = {
  emails: UpsertTriggersPayload['emails']
  slacks: UpsertTriggersPayload['slacks']
}

type SendNotificationModalProps = {
  isLoading: boolean
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  emailRows: EmailRecipientTableRow[]
  slackRows: SlackChannelTableRow[]
  onEmailSelect: (emails: EmailRecipientTableRow[]) => void
  onSlackSelect: (slacks: SlackChannelTableRow[]) => void
  onModalClose: () => void
}

const checkIsSelectionChanged = (
  defaultSelection: TriggerNotifications,
  selection: TriggerNotifications,
): boolean => {
  const dropdownOptions: (keyof TriggerNotifications)[] = ['emails', 'slacks']

  return dropdownOptions.some((key) => {
    const defaultValue = defaultSelection[key].map((selection) => selection.id)
    const selectedValue = selection[key].map((selection) => selection.id)

    return !isEqual(defaultValue, selectedValue)
  })
}

export const SendNotificationModal = (props: SendNotificationModalProps) => {
  const {
    isLoading,
    isModalOpen,
    payload,
    emailRows,
    slackRows,
    onEmailSelect,
    onSlackSelect,
    onModalClose: onModalCloseProp,
  } = props

  const { emails: defaultSelectedEmails, slacks: defaultSelectedSlacks } =
    payload

  const { t } = useTranslation()

  // Clone values to avoid referencing the original payload fields directly
  // Prevents unintended shared mutations in state
  const cloneNotifications = useCallback((): TriggerNotifications => {
    return structuredClone({
      emails: defaultSelectedEmails,
      slacks: defaultSelectedSlacks,
    })
  }, [defaultSelectedEmails, defaultSelectedSlacks])

  const [activeTab, setActiveTab] = useState<NotificationTab>('Email')

  const [selectedNotifications, setSelectedNotifications] =
    useState<TriggerNotifications>(cloneNotifications)

  useEffect(() => {
    setSelectedNotifications(cloneNotifications())
  }, [cloneNotifications])

  const isSelectionChanged = useMemo(() => {
    const defaultNotifications = cloneNotifications()
    return checkIsSelectionChanged(defaultNotifications, selectedNotifications)
  }, [cloneNotifications, selectedNotifications])

  const onSelectedEmailsChange = (email: EmailRecipientTableRow) => {
    setSelectedNotifications((prev) => ({
      ...prev,
      emails: xor(prev.emails, [email]),
    }))
  }

  const onSelectedSlacksChange = (slack: SlackChannelTableRow) => {
    setSelectedNotifications((prev) => ({
      ...prev,
      slacks: xor(prev.slacks, [slack]),
    }))
  }

  const onModalClose = () => {
    setSelectedNotifications({
      emails: defaultSelectedEmails,
      slacks: defaultSelectedSlacks,
    })
    onModalCloseProp()
  }

  const onActionClick = () => {
    onEmailSelect(selectedNotifications.emails)
    onSlackSelect(selectedNotifications.slacks)
    onModalCloseProp()
  }

  const renderContentFnMap: Record<NotificationTab, () => ReactNode> = {
    Email: () => (
      <EmailBatchActionTable
        isLoading={isLoading}
        rows={emailRows}
        selectedRows={selectedNotifications.emails}
        onCheckChange={onSelectedEmailsChange}
      />
    ),
    Slack: () => (
      <SlackBatchActionTable
        isLoading={isLoading}
        rows={slackRows}
        selectedRows={selectedNotifications.slacks}
        onCheckChange={onSelectedSlacksChange}
      />
    ),
  }

  const renderContent = renderContentFnMap[activeTab]

  return (
    <CosModal
      isOpen={isModalOpen}
      title={t('events.triggers.upsert.sendNotification')}
      actionText={t('events.triggers.upsert.sendNotification.setResponse')}
      actionButtonProps={{
        disabled: !isSelectionChanged,
      }}
      onActionClick={onActionClick}
      onCloseClick={onModalClose}
    >
      <div className="flex flex-col gap-y-8">
        <CosContentSwitcher variant="default">
          <CosContentSwitcher.Item
            isActive={activeTab === 'Email'}
            onClick={() => setActiveTab('Email')}
          >
            {t('events.triggers.upsert.sendNotification.email')}
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={activeTab === 'Slack'}
            onClick={() => setActiveTab('Slack')}
          >
            {t('events.triggers.upsert.sendNotification.slack')}
          </CosContentSwitcher.Item>
        </CosContentSwitcher>
        {renderContent()}
      </div>
    </CosModal>
  )
}
