import { useState } from 'react'
import { uniqueId } from 'lodash'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosToast } from '../../../../components/CosNotification/CosToastNotification/CosToast'
import { CosToastType } from '../../../../components/CosNotification/CosToastNotification/utils'
import { ToastNotificationGrid } from './ToastNotificationGrid'
import { CreateToastButton } from './CreateToastButton'

const notificationTitle = 'Notification Title'
const notificationTime = 'yyyy/mm/dd 00:00'
const hyperlink = {
  text: 'Call to action',
  href: `/#${Math.random()}`,
}

export const ToastNotificationLayout = () => {
  return (
    <StoryLayout
      title="Notification - Toast"
      desc="A maximum of four notifications can be displayed at once, each lasting up to 5 seconds; if exceeded, the earlier notifications will disappear."
    >
      <StoryLayout.Section title="Notification - Toast">
        <ToastNotificationGrid title="Master">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="Custom">
          <CreateToastButton />
        </ToastNotificationGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Usage">
        <ToastNotificationGrid title="Neutral">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="Positive">
          <ToastNotification
            id={uniqueId()}
            type="positive"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="Warning">
          <ToastNotification
            id={uniqueId()}
            type="warning"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="Error">
          <ToastNotification
            id={uniqueId()}
            type="error"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layout">
        <ToastNotificationGrid title="">
          <div className="primary-body2 text-center font-medium">Neutral</div>
          <div className="primary-body2 text-center font-medium">Positive</div>
        </ToastNotificationGrid>
        <ToastNotificationGrid title="No title or link">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            time={notificationTime}
          />
          <ToastNotification
            id={uniqueId()}
            type="positive"
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="With title">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            title={notificationTitle}
            time={notificationTime}
          />
          <ToastNotification
            id={uniqueId()}
            type="positive"
            title={notificationTitle}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="With link">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            link={hyperlink}
            time={notificationTime}
          />
          <ToastNotification
            id={uniqueId()}
            type="positive"
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
        <ToastNotificationGrid title="With both title and link">
          <ToastNotification
            id={uniqueId()}
            type="neutral"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
          <ToastNotification
            id={uniqueId()}
            type="positive"
            title={notificationTitle}
            link={hyperlink}
            time={notificationTime}
          />
        </ToastNotificationGrid>
      </StoryLayout.Section>
    </StoryLayout>
  )
}

type ToastNotificationProps = Omit<CosToastType, 'message'>

const ToastNotification = (props: ToastNotificationProps) => {
  const [isToastClose, setIsToastClose] = useState(false)

  if (isToastClose) return null

  return (
    <CosToast
      {...props}
      message="Subtitle text goes here. Subtitle text goes here. Subtitle text goes here."
      onToastClose={() => setIsToastClose(true)}
    />
  )
}
