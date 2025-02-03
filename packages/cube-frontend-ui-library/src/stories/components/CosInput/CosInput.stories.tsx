import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosInput, CosInputProps } from '../../../components/CosInput/CosInput'
import { CosPasswordInput } from '../../../components/CosInput/CosPasswordInput'
import { InputBox } from './InputBox'
import { ChangeEventHandler, useState } from 'react'
import { fn } from '@storybook/test'

const meta = {
  title: 'Molecules/Input',
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CosInput>

export default meta

const INPUT_DATA = {
  label: 'Label',
  placeholder: 'Input Placeholder',
  text: 'Input Text',
  longText:
    'Display an ellipsis when a long message is entered in the input field.',
  errorMessage: 'Error message here',
  helpMessage: 'Helper message here',
}

export const Gallery: StoryObj = {
  args: {},
  render: function Render(args: CosInputProps) {
    const { onChange } = args
    const [text, setText] = useState<string>('')
    const [textDefault, setTextDefault] = useState<string>(INPUT_DATA.text)
    const [textLongDefault, setTextLongDefault] = useState<string>(
      INPUT_DATA.longText,
    )

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setText(e.target.value)
      if (onChange) onChange(e)
    }

    const handleTextDefaultChange: ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      setTextDefault(e.target.value)
      if (onChange) onChange(e)
    }

    const handleTextLongDefaultChange: ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      setTextLongDefault(e.target.value)
      if (onChange) onChange(e)
    }

    return (
      <StoryLayout title="Text Input">
        <StoryLayout.Section title="Text Input">
          <InputBox title="Master">
            <CosInput
              placeholder={INPUT_DATA.placeholder}
              value={text}
              onChange={handleTextChange}
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
            <InputBox title="Default">
              <CosInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={text}
                onChange={handleTextChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                initialShowPassword={true}
                value={text}
                onChange={handleTextChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={text}
                onChange={handleTextChange}
              />
            </InputBox>
            <InputBox title="Required">
              <CosInput
                required
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={text}
                onChange={handleTextChange}
              />
              <CosPasswordInput
                required
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                initialShowPassword={true}
                value={text}
                onChange={handleTextChange}
              />
              <CosPasswordInput
                required
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={text}
                onChange={handleTextChange}
              />
            </InputBox>
            <InputBox title="Filled Default">
              <CosInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                initialShowPassword={true}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
            </InputBox>
            <InputBox title="Helper Message">
              <CosInput
                label={INPUT_DATA.label}
                helpMessage={INPUT_DATA.helpMessage}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                helpMessage={INPUT_DATA.helpMessage}
                initialShowPassword={true}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                helpMessage={INPUT_DATA.helpMessage}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
            </InputBox>
            <InputBox title="Error Message">
              <CosInput
                label={INPUT_DATA.label}
                errorMessage={INPUT_DATA.errorMessage}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                errorMessage={INPUT_DATA.errorMessage}
                initialShowPassword={true}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                errorMessage={INPUT_DATA.errorMessage}
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
            </InputBox>
            <InputBox title="Disable">
              <CosInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                disabled
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                initialShowPassword={true}
                disabled
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                defaultValue={INPUT_DATA.text}
                disabled
              />
            </InputBox>
            <InputBox title="Truncate text">
              <CosInput
                label={INPUT_DATA.label}
                value={textLongDefault}
                onChange={handleTextLongDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                initialShowPassword={true}
                value={textLongDefault}
                onChange={handleTextLongDefaultChange}
              />
              <CosPasswordInput
                label={INPUT_DATA.label}
                value={textLongDefault}
                onChange={handleTextLongDefaultChange}
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
