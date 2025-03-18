import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosTextArea } from '../../../components/CosTextArea/CosTextArea'
import { TextAreaGrid } from './TextAreaGrid'
import { TextArea } from './TextArea'

const meta = {
  title: 'Molecules/Textarea',
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CosTextArea>

export default meta

const TEXTAREA_LABEL = 'Label'

const TEXTAREA_PLACEHOLDER = 'Placeholder text'

const TEXTAREA_ERROR_MESSAGE = 'Error message goes here'

const TEXTAREA_SHORT_DATA = 'Text Area Text'

const TEXTAREA_LONG_DATA = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum have been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.`

export const Gallery: StoryObj<typeof CosTextArea> = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout title="Text Area">
        <StoryLayout.Section title="Text Area">
          <TextAreaGrid title="Master">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={undefined}
              placeholder={TEXTAREA_PLACEHOLDER}
              maxLength={20}
            />
          </TextAreaGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Status">
          <TextAreaGrid title="Default">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={TEXTAREA_SHORT_DATA}
              placeholder={TEXTAREA_PLACEHOLDER}
              maxLength={20}
            />
          </TextAreaGrid>
          <TextAreaGrid title="Filled Default">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={TEXTAREA_SHORT_DATA}
              placeholder={TEXTAREA_PLACEHOLDER}
              maxLength={20}
            />
          </TextAreaGrid>
          <TextAreaGrid title="Error">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={TEXTAREA_SHORT_DATA}
              placeholder={TEXTAREA_PLACEHOLDER}
              errorMessage={TEXTAREA_ERROR_MESSAGE}
              maxLength={20}
            />
          </TextAreaGrid>
          <TextAreaGrid title="Truncate text">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={TEXTAREA_LONG_DATA}
              placeholder={TEXTAREA_PLACEHOLDER}
              maxLength={400}
            />
          </TextAreaGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <TextAreaGrid title="Default">
            <TextArea
              label={TEXTAREA_LABEL}
              defaultValue={undefined}
              placeholder={TEXTAREA_PLACEHOLDER}
              maxLength={20}
              isLoading={true}
            />
          </TextAreaGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
