import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import {
  CosInlineNotification,
  CosInlineNotificationType,
} from '../../../../components/CosNotification/CosInlineNotification/CosInlineNotification'
import { InlineNotificationGrid } from './InlineNotificationGrid'

const hyperlinkText = 'Go to the page'
const hyperlinkHref = `/#${Math.random()}`

export const InlineNotificationLayout = () => {
  return (
    <StoryLayout
      title="Notification - Inline"
      desc="We encourage to keep the notification in one line."
    >
      <StoryLayout.Section title="Notification - Inline">
        <InlineNotificationGrid title="Master">
          <InlineNotification
            type="neutral"
            content="Content text goes here."
          />
        </InlineNotificationGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Usage">
        <InlineNotificationGrid title="Neutral">
          <InlineNotification
            type="neutral"
            content="Content text goes here."
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Positive">
          <InlineNotification
            type="positive"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Warning">
          <InlineNotification
            type="warning"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Error">
          <InlineNotification
            type="error"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layout">
        <InlineNotificationGrid title="Title only">
          <InlineNotification
            type="neutral"
            title="Notification title goes here"
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Title, content, link">
          <InlineNotification
            type="neutral"
            title="Notification title goes here"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Content, link">
          <InlineNotification
            type="neutral"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, content">
          <InlineNotification
            type="positive"
            content="Content text goes here."
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, content, link">
          <InlineNotification
            type="positive"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, title, content, link">
          <InlineNotification
            type="positive"
            title="Notification title goes here"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Content over 1 row">
          <InlineNotification
            type="positive"
            content="Lorem ipsum dolor sit amet consectetur. Metus velit tincidunt hendrerit lectus ornare sed. Et adipiscing scelerisque id posuere. Senectus gravida risus vitae est. Tortor laoreet molestie semper consectetur non mauris dui ut at. Risus egestas lectus euismod pretium volutpat donec. Sem mauris posuere risus et aliquet. Hendrerit sit sed dictum cras sed morbi. Vel nibh nisl sed et dolor rhoncus id gravida sit. Pulvinar lacinia viverra sed sed dolor."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
          />
        </InlineNotificationGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <InlineNotificationGrid title="Title only">
          <InlineNotification
            type="neutral"
            title="Notification title goes here"
            isLoading={true}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Title, content, link">
          <InlineNotification
            type="neutral"
            title="Notification title goes here"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
            isLoading={true}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Content, link">
          <InlineNotification
            type="neutral"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
            isLoading={true}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, content">
          <InlineNotification
            type="positive"
            content="Content text goes here."
            isLoading={true}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, content, link">
          <InlineNotification
            type="positive"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
            isLoading={true}
          />
        </InlineNotificationGrid>
        <InlineNotificationGrid title="Icon, title, content, link">
          <InlineNotification
            type="positive"
            title="Notification title goes here"
            content="Content text goes here."
            linkHref={hyperlinkHref}
            linkText={hyperlinkText}
            isLoading={true}
          />
        </InlineNotificationGrid>
      </StoryLayout.Section>
    </StoryLayout>
  )
}

type InlineNotificationProps = {
  type: CosInlineNotificationType
  title?: string
  content?: string
  linkHref?: string
  linkText?: string
  isLoading?: boolean
}

const InlineNotification = (props: InlineNotificationProps) => {
  const { content, ...restProps } = props

  return <CosInlineNotification {...restProps}>{content}</CosInlineNotification>
}
