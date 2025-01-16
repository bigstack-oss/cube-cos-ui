import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosTableInput,
  CosTableInputProps,
} from '../../../components/CosTableInput/CosTableInput'
import { InputBox } from './InputBox'

const meta = {
  argTypes: { onChange: { action: 'onChange' } },
} satisfies Meta

export default meta

const INPUT_DATA = {
  text: 'Text',
  longText: 'Long Text',
  placeholder: 'Input',
  errorMessage: 'Error messages',
}

export const Gallery: StoryObj = {
  args: {},
  render: (args: CosTableInputProps) => {
    const { onChange } = args
    return (
      <StoryLayout
        title="Text Input - Inside Table"
        desc="The shape of text input - inside table please see “Table” page."
      >
        <StoryLayout.Section title="Text Input - Inside Table">
          <InputBox
            title="Master"
            desc="The min width of text area is 35px. The max width of input-box is 320px."
          >
            <CosTableInput
              placeholder={INPUT_DATA.placeholder}
              onChange={onChange}
            />
          </InputBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col space-y-8">
            <InputBox title="Default / Hover">
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                onChange={onChange}
              />
            </InputBox>
            <InputBox title="Filled Default / Hover">
              <CosTableInput
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
              />
            </InputBox>
            <InputBox
              title="Error"
              desc="Error information will be shown as tooltips."
            >
              <CosTableInput
                defaultValue={INPUT_DATA.text}
                errorMessage={INPUT_DATA.errorMessage}
                onChange={onChange}
              />
            </InputBox>
            <InputBox title="Disable">
              <CosTableInput
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
                disabled
              />
            </InputBox>
            <InputBox title="Truncate text">
              <CosTableInput
                defaultValue={INPUT_DATA.longText}
                onChange={onChange}
              />
            </InputBox>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <InputBox title="Default">
            <CosTableInput
              placeholder={INPUT_DATA.placeholder}
              onChange={onChange}
              isLoading={true}
            />
          </InputBox>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
