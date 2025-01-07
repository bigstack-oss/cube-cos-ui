import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosTableInput } from '../../../components/CosTableInput/CosTableInput'
import { InputBox } from './InputBox'

const meta = {} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout
      title="Text Input - Inside Table"
      desc="The shape of text input - inside table please see “Table” page."
    >
      <StoryLayout.Section title="Text Input - Inside Table">
        <InputBox
          title="Master"
          desc="The min width of text area is 35px. The max width of input-box is 320px."
        >
          <CosTableInput placeholder="Input" />
        </InputBox>
      </StoryLayout.Section>
      <StoryLayout.Section title="Variants">
        <div className="flex flex-col space-y-8">
          <InputBox title="Default / Hover">
            <CosTableInput placeholder="Input" />
          </InputBox>
          <InputBox title="Filled Default / Hover">
            <CosTableInput value="Text" />
          </InputBox>
          <InputBox
            title="Error"
            desc="Error information will be shown as tooltips."
          >
            <CosTableInput value="Text" errorMessage="Error messages go here" />
          </InputBox>
          <InputBox title="Disable">
            <CosTableInput value="Text" disabled />
          </InputBox>
          <InputBox title="Truncate text">
            <CosTableInput
              value="When text is to long, ellipsis will show"
              showEllipsis={true}
            />
          </InputBox>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <InputBox title="Default">
          <CosTableInput placeholder="Input" isLoading={true} />
        </InputBox>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
