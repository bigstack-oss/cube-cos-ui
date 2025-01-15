import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosInput, CosInputProps } from '../../../components/CosInput/CosInput'
import { CosPasswordInput } from '../../../components/CosInput/CosPasswordInput'
import { InputBox } from './InputBox'
import { action } from '@storybook/addon-actions'

const meta = {} satisfies Meta

export default meta

const INPUT_DATA = {
  label: 'Label',
  placeholder: 'Input Placeholder',
  text: 'Input Text',
  longText:
    'Display an ellipsis when a long message is entered in the input field.',
  errorMessage: 'Error message here',
}

export const Gallery: StoryObj = {
  args: {
    onChange: action('onChange'),
  },
  render: (args: CosInputProps) => {
    const { onChange } = args
    return (
      <StoryLayout title="Text Input">
        <StoryLayout.Section title="Text Input">
          <InputBox title="Master">
            <CosInput
              placeholder={INPUT_DATA.placeholder}
              onChange={onChange}
            />
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
              <CosInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                initialShowPassword={true}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                onChange={onChange}
              />
            </InputBox>
            <InputBox title="Filled Default / Hover">
              <CosInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                initialShowPassword={true}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
              />
            </InputBox>
            <InputBox title="Error">
              <CosInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                errorMessage={INPUT_DATA.errorMessage}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                errorMessage={INPUT_DATA.errorMessage}
                initialShowPassword={true}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                errorMessage={INPUT_DATA.errorMessage}
                onChange={onChange}
              />
            </InputBox>
            <InputBox title="Disable">
              <CosInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
                disabled
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
                initialShowPassword={true}
                disabled
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                onChange={onChange}
                disabled
              />
            </InputBox>
            <InputBox title="Truncate text">
              <CosInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.longText}
                onChange={onChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.longText}
                onChange={onChange}
                initialShowPassword={true}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.longText}
                onChange={onChange}
              />
            </InputBox>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col space-y-8">
            <InputBox title="Default">
              <CosInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                onChange={onChange}
                isLoading={true}
              />
            </InputBox>
            <InputBox title="W/ Message">
              <CosInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                errorMessage={INPUT_DATA.errorMessage}
                onChange={onChange}
                isLoading={true}
              />
            </InputBox>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
