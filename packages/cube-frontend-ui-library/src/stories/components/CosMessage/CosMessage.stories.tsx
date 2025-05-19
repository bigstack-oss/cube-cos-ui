import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosMessage } from '../../../components/CosMessage/CosMessage'
import { MessageGrid } from './MessageGrid'

const meta = {
  title: 'Molecules/Message',
} satisfies Meta<typeof CosMessage>

export default meta

export const Gallery: StoryObj<typeof CosMessage> = {
  render: () => {
    return (
      <StoryLayout title="Message">
        <StoryLayout.Section title="Message">
          <MessageGrid title="Master">
            <CosMessage
              label="Label"
              time="YYYY/MM/DD 00:00:00"
              title="%Variable%"
              tag="Tag"
            >
              Message content
            </CosMessage>
          </MessageGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <MessageGrid title="Regular">
            <CosMessage title="%Variable%">Message content</CosMessage>
          </MessageGrid>
          <MessageGrid title="w/Icon">
            <CosMessage title="%Variable%" tag="Tag">
              Message content
            </CosMessage>
          </MessageGrid>
          <MessageGrid title="w/Label">
            <CosMessage label="Label" title="%Variable%" tag="Tag">
              Message content
            </CosMessage>
          </MessageGrid>
          <MessageGrid title="w/Time">
            <CosMessage
              label="Label"
              time="YYYY/MM/DD 00:00:00"
              title="%Variable%"
              tag="Tag"
            >
              Message content
            </CosMessage>
          </MessageGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
