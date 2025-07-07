import { ReactNode, useEffect, useState } from 'react'
import {
  CosButton,
  CosContentSwitcher,
  CosModal,
} from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { UpsertTriggersPayload } from '../../../upsertTriggersUtils'
import { EmailBatchActionTable } from './EmailBatchActionTable'
import { SlackBatchActionTable } from './SlackBatchActionTable'
import { EmailRecipientTableRow, SlackChannelTableRow } from '../SetResponse'

type NotificationTab = 'Email' | 'Slack'

type SendNotificationModalProps = {
  isLoading: boolean
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  emailRows: EmailRecipientTableRow[]
  slackRows: SlackChannelTableRow[]
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onModelOpen: () => void
  onModelClose: () => void
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
    onModelClose: onModelCloseProp,
    onModelOpen,
  } = props

  const { emails: selectedEmails, slacks: selectedSlacks } = payload

  const [activeTab, setActiveTab] = useState<NotificationTab>('Email')

  const [tempNotifications, setTempNotifications] = useState<{
    emails: string[]
    slacks: string[]
  }>({ emails: selectedEmails, slacks: selectedSlacks })

  useEffect(() => {
    setTempNotifications({
      emails: selectedEmails,
      slacks: selectedSlacks,
    })
  }, [selectedEmails, selectedSlacks])

  const onTempEmailsChange = (email: string) => {
    setTempNotifications((prev) => {
      const { emails } = prev
      const updatedEmails = emails.includes(email)
        ? emails.filter((e) => e !== email)
        : [...emails, email]

      return { ...prev, emails: updatedEmails }
    })
  }

  const onTempSlacksChange = (slack: string) => {
    setTempNotifications((prev) => {
      const { slacks } = prev
      const updatedSlacks = slacks.includes(slack)
        ? slacks.filter((s) => s !== slack)
        : [...slacks, slack]

      return { ...prev, slacks: updatedSlacks }
    })
  }

  const onModelClose = () => {
    setTempNotifications({
      emails: selectedEmails,
      slacks: selectedSlacks,
    })
    onModelCloseProp()
  }

  const onActionClick = () => {
    onEmailSelect(tempNotifications.emails)
    onSlackSelect(tempNotifications.slacks)
    onModelCloseProp()
  }

  const renderContentFnMap: Record<NotificationTab, () => ReactNode> = {
    Email: () => (
      <EmailBatchActionTable
        isLoading={isLoading}
        rows={emailRows}
        selectedRowIds={tempNotifications.emails}
        onCheckChange={onTempEmailsChange}
      />
    ),
    Slack: () => (
      <SlackBatchActionTable
        isLoading={isLoading}
        rows={slackRows}
        selectedRowIds={tempNotifications.slacks}
        onCheckChange={onTempSlacksChange}
      />
    ),
  }

  const renderContent = renderContentFnMap[activeTab]

  return (
    <div>
      <CosButton
        type="ghost"
        usage="icon-left"
        Icon={AddSquare}
        onClick={onModelOpen}
      >
        Send Notification
      </CosButton>
      <CosModal
        isOpen={isModalOpen}
        title="Send Notification"
        actionText="Set Response"
        onActionClick={onActionClick}
        onCloseClick={onModelClose}
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
    </div>
  )
}
