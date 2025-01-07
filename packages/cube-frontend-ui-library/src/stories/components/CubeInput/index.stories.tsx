import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosInput } from '../../../components/CosInput/CosInput'
import { CosPasswordInput } from '../../../components/CosInput/CosPasswordInput'
import { InputBox } from './InputBox'

const meta = {
  component: CosInput,
} satisfies Meta<typeof CosInput>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Text Input">
      <StoryLayout.Section title="Text Input">
        <InputBox title="Master">
          <CosInput placeholder="Input Placeholder" />
          <div className="primary-body3 col-span-2 text-functional-text-light">
            The min width of text frame is 170px.
          </div>
        </InputBox>
      </StoryLayout.Section>
      <StoryLayout.Section title="Variants">
        <div className="flex flex-col space-y-8">
          <InputBox title="">
            <div className="col-span-1 text-center">Regular</div>
            <div className="col-span-2 text-center">w/Action icon</div>
          </InputBox>
          <InputBox title="">
            <div className="text-center"></div>
            <div className="text-center">Display Text</div>
            <div className="text-center">Hide Text</div>
          </InputBox>
          <InputBox title="Default / Hover">
            <CosInput label="Label" placeholder="Input Placeholder" />
            <CosPasswordInput
              label="Label"
              placeholder="Input Placeholder"
              defaultShowText={true}
            />
            <CosPasswordInput label="Label" placeholder="Input Placeholder" />
          </InputBox>
          <InputBox title="Filled Default / Hover">
            <CosInput label="Label" value="Input Text" />
            <CosPasswordInput
              label="Label"
              value="Input Text"
              defaultShowText={true}
            />
            <CosPasswordInput label="Label" value="Input Text" />
          </InputBox>
          <InputBox title="Error">
            <CosInput
              label="Label"
              value="Input Text"
              errorMessage="Error message here"
            />
            <CosPasswordInput
              label="Label"
              value="Input Text"
              errorMessage="Error message here"
              defaultShowText={true}
            />
            <CosPasswordInput
              label="Label"
              value="Input Text"
              errorMessage="Error message here"
            />
          </InputBox>
          <InputBox title="Disable">
            <CosInput
              label="Label"
              color="secondary"
              value="Input Text"
              disabled={true}
            />
            <CosPasswordInput
              label="Label"
              value="Input Text"
              disabled={true}
              defaultShowText={true}
            />
            <CosPasswordInput
              label="Label"
              value="Input Text"
              disabled={true}
            />
          </InputBox>
          <InputBox title="Truncate text">
            <CosInput
              label="Label"
              value="Display an ellipsis when a long message is entered in the input field."
              showEllipsis={true}
            />
            <CosPasswordInput
              label="Label"
              value="Display an ellipsis when a long message is entered in the input field."
              showEllipsis={true}
              defaultShowText={true}
            />
            <CosPasswordInput
              label="Label"
              value="Display an ellipsis when a long message is entered in the input field."
              showEllipsis={true}
            />
          </InputBox>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col space-y-8">
          <InputBox title="Default">
            <CosInput label="error" isLoading={true} />
          </InputBox>
          <InputBox title="W/ Message">
            <CosInput label="error" errorMessage="error" isLoading={true} />
          </InputBox>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
