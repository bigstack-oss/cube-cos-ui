import { ReactNode, useEffect, useState } from 'react'
import {
  CosButton,
  CosContentSwitcher,
  CosModal,
} from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { EmailBatchActionTable } from './EmailBatchActionTable'
import { SlackBatchActionTable } from './SlackBatchActionTable'
import { EmailRecipientTableRow, SlackChannelTableRow } from './SetResponse'

type NotificationTab = 'Email' | 'Slack'

type SendNotificationModalProps = {
  isLoading: boolean
  isModalOpen: boolean
  emailRows: EmailRecipientTableRow[]
  slackRows: SlackChannelTableRow[]
  selectedEmails: string[]
  selectedSlacks: string[]
  onEmailSelect: (emails: string[]) => void
  onSlackSelect: (slacks: string[]) => void
  onModelOpen: () => void
  onModelClose: () => void
}

export const SendNotificationModal = (props: SendNotificationModalProps) => {
  const {
    isLoading,
    isModalOpen,
    emailRows,
    slackRows,
    selectedEmails,
    selectedSlacks,
    onEmailSelect,
    onSlackSelect,
    onModelClose: onModelCloseProp,
    onModelOpen,
  } = props

  const [activeTab, setActiveTab] = useState<NotificationTab>('Email')

  const [tempEmails, setTempEmails] = useState<string[]>(selectedEmails)

  const [tempSlacks, setTempSlacks] = useState<string[]>(selectedSlacks)

  useEffect(() => setTempEmails(selectedEmails), [selectedEmails])

  useEffect(() => setTempSlacks(selectedSlacks), [selectedSlacks])

  const onTempEmailsChange = (email: string) => {
    const isSelected = tempEmails.includes(email)
    setTempEmails((prev) => {
      return isSelected ? prev.filter((e) => e !== email) : [...prev, email]
    })
  }

  const onTempSlacksChange = (slack: string) => {
    const isSelected = tempSlacks.includes(slack)
    setTempSlacks((prev) => {
      return isSelected ? prev.filter((s) => s !== slack) : [...prev, slack]
    })
  }

  const onModelClose = () => {
    setTempEmails(selectedEmails)
    setTempSlacks(selectedSlacks)
    onModelCloseProp()
  }

  const onActionClick = () => {
    onEmailSelect(tempEmails)
    onSlackSelect(tempSlacks)
    onModelCloseProp()
  }

  const renderContentFnMap: Record<NotificationTab, () => ReactNode> = {
    Email: () => (
      <EmailBatchActionTable
        isLoading={isLoading}
        rows={emailRows}
        selectedRowIds={tempEmails}
        onCheckChange={onTempEmailsChange}
      />
    ),
    Slack: () => (
      <SlackBatchActionTable
        isLoading={isLoading}
        rows={slackRows}
        selectedRowIds={tempSlacks}
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
