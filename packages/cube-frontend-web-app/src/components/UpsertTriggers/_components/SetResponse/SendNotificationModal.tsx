import { ReactNode, useState } from 'react'
import {
  CosButton,
  CosContentSwitcher,
  CosModal,
} from '@cube-frontend/ui-library'
import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import { EmailBatchActionTable } from './EmailBatchActionTable'
import { SlackBatchActionTable } from './SlackBatchActionTable'
import { useNotification } from './useNotification'

type NotificationTab = 'Email' | 'Slack'

type SendNotificationModalProps = {
  isModalOpen: boolean
  onModelOpen: () => void
  onModelClose: () => void
  onActionClick: () => void
}

export const SendNotificationModal = (props: SendNotificationModalProps) => {
  const { isModalOpen, onModelOpen, onModelClose, onActionClick } = props

  const [activeTab, setActiveTab] = useState<NotificationTab>('Email')

  const {
    isEmailsLoading,
    isSlacksLoading,
    emailRows,
    slackRows,
    selectedEmails,
    selectedSlacks,
    onEmailSelect,
    onSlackSelect,
  } = useNotification()

  const renderContentFnMap: Record<NotificationTab, () => ReactNode> = {
    Email: () => (
      <EmailBatchActionTable
        isLoading={isEmailsLoading}
        rows={emailRows}
        selectedRowIds={selectedEmails}
        onCheckChange={onEmailSelect}
      />
    ),
    Slack: () => (
      <SlackBatchActionTable
        isLoading={isSlacksLoading}
        rows={slackRows}
        selectedRowIds={selectedSlacks}
        onCheckChange={onSlackSelect}
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
