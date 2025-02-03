import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosTableInput,
  CosTableInputProps,
} from '../../../components/CosTableInput/CosTableInput'
import { InputBox } from './InputBox'
import { ChangeEventHandler, useState } from 'react'
import { fn } from '@storybook/test'

const meta = {
  title: 'Molecules/TableInput',
  argTypes: {
    onChange: fn(),
  },
} satisfies Meta<CosTableInputProps>

export default meta

const INPUT_DATA = {
  text: 'Text',
  longText: 'Long Text',
  placeholder: 'Input',
  errorMessage: 'Error messages',
}

export const Gallery: StoryObj = {
  args: {},
  render: function Render(args: CosTableInputProps) {
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
              value={text}
              onChange={handleTextChange}
            />
          </InputBox>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col space-y-8">
            <InputBox title="Default">
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                value={text}
                onChange={handleTextChange}
              />
            </InputBox>
            <InputBox title="Filled Default">
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
              />
            </InputBox>
            <InputBox
              title="Error"
              desc="Error information will be shown as tooltips."
            >
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                value={textDefault}
                onChange={handleTextDefaultChange}
                errorMessage={INPUT_DATA.errorMessage}
              />
            </InputBox>
            <InputBox title="Disable">
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                defaultValue={INPUT_DATA.text}
                disabled
              />
            </InputBox>
            <InputBox title="Truncate text">
              <CosTableInput
                placeholder={INPUT_DATA.placeholder}
                value={textLongDefault}
                onChange={handleTextLongDefaultChange}
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
