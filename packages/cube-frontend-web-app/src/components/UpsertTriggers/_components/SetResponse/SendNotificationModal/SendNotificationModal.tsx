import { ReactNode, useEffect, useState } from 'react'
import { CosContentSwitcher, CosModal } from '@cube-frontend/ui-library'
import { UpsertTriggersPayload } from '../../../upsertTriggersUtils'
import { EmailRecipientTableRow, SlackChannelTableRow } from '../SetResponse'
import { EmailBatchActionTable } from './EmailBatchActionTable'
import { SlackBatchActionTable } from './SlackBatchActionTable'

type NotificationTab = 'Email' | 'Slack'

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

  const { emails: selectedEmails, slacks: selectedSlacks } = payload

  const [activeTab, setActiveTab] = useState<NotificationTab>('Email')

  const [tempNotifications, setTempNotifications] = useState<{
    emails: EmailRecipientTableRow[]
    slacks: SlackChannelTableRow[]
  }>({ emails: selectedEmails, slacks: selectedSlacks })

  useEffect(() => {
    setTempNotifications({
      emails: selectedEmails,
      slacks: selectedSlacks,
    })
  }, [selectedEmails, selectedSlacks])

  const onTempEmailsChange = (email: EmailRecipientTableRow) => {
    setTempNotifications((prev) => {
      const { emails } = prev
      const updatedEmails = emails.includes(email)
        ? emails.filter((e) => e !== email)
        : [...emails, email]

      return { ...prev, emails: updatedEmails }
    })
  }

  const onTempSlacksChange = (slack: SlackChannelTableRow) => {
    setTempNotifications((prev) => {
      const { slacks } = prev
      const updatedSlacks = slacks.includes(slack)
        ? slacks.filter((s) => s !== slack)
        : [...slacks, slack]

      return { ...prev, slacks: updatedSlacks }
    })
  }

  const onModalClose = () => {
    setTempNotifications({
      emails: selectedEmails,
      slacks: selectedSlacks,
    })
    onModalCloseProp()
  }

  const onActionClick = () => {
    onEmailSelect(tempNotifications.emails)
    onSlackSelect(tempNotifications.slacks)
    onModalCloseProp()
  }

  const renderContentFnMap: Record<NotificationTab, () => ReactNode> = {
    Email: () => (
      <EmailBatchActionTable
        isLoading={isLoading}
        rows={emailRows}
        selectedRows={tempNotifications.emails}
        onCheckChange={onTempEmailsChange}
      />
    ),
    Slack: () => (
      <SlackBatchActionTable
        isLoading={isLoading}
        rows={slackRows}
        selectedRows={tempNotifications.slacks}
        onCheckChange={onTempSlacksChange}
      />
    ),
  }

  const renderContent = renderContentFnMap[activeTab]

  return (
    <CosModal
      isOpen={isModalOpen}
      title="Send Notification"
      actionText="Set Response"
      onActionClick={onActionClick}
      onCloseClick={onModalClose}
      className="h-[490px]"
    >
      <div className="flex flex-col gap-y-8">
        <CosContentSwitcher variant="default">
          <CosContentSwitcher.Item
            isActive={activeTab === 'Email'}
            onClick={() => setActiveTab('Email')}
          >
            Email
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={activeTab === 'Slack'}
            onClick={() => setActiveTab('Slack')}
          >
            Slack
          </CosContentSwitcher.Item>
        </CosContentSwitcher>
        {renderContent()}
      </div>
    </CosModal>
  )
}
