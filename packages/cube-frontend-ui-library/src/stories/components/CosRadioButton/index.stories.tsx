import type { Meta, StoryObj } from '@storybook/react'
import { ChangeEvent, useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosRadioButton,
  CosRadioButtonProps,
} from '../../../components/CosRadioButton/CosRadioButton'
import { CosRadioButtonGroup } from '../../../components/CosRadioButton/CosRadioButtonGroup'
import { RadioButtonGrid } from './RadioButtonGrid'

const meta = {
  component: CosRadioButton,
} satisfies Meta<typeof CosRadioButton>

export default meta

const radioButtonLabel = 'Radio Button item'
const radioButtonValue = 'radio-button'

const options = [
  { label: 'The Shawshank Redemption', value: 'shawshank' },
  { label: 'The Dark Knight', value: 'dark-knight' },
  { label: 'Inception', value: 'inception' },
  { label: 'The Godfather', value: 'godfather' },
  { label: 'Pulp Fiction', value: 'pulp-fiction' },
  {
    label: 'The Lord of the Rings: The Return of the King',
    value: 'lotr-return',
  },
] satisfies CosRadioButtonProps[]

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    const [radio, setRadio] = useState<string>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setRadio(value)
    }

    return (
      <StoryLayout title="Radio Button">
        <StoryLayout.Section title="Radio Button">
          <div className="flex flex-col gap-y-8">
            <RadioButtonGrid title="Master">
              <CosRadioButton
                label={radioButtonLabel}
                value={radioButtonValue}
                checked={radio === radioButtonValue}
                onChange={handleChange}
              />
            </RadioButtonGrid>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-8">
            <RadioButtonGrid title="Unselect">
              <CosRadioButton
                label={radioButtonLabel}
                value={radioButtonValue}
                checked={radio === radioButtonValue}
                onChange={handleChange}
              />
              <CosRadioButton label={radioButtonLabel} disabled />
            </RadioButtonGrid>
            <RadioButtonGrid title="Select">
              <CosRadioButton label={radioButtonLabel} defaultChecked={true} />
              <CosRadioButton
                label={radioButtonLabel}
                defaultChecked={true}
                disabled
              />
            </RadioButtonGrid>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <div className="flex flex-col gap-y-20">
            <RadioButtonGrid title="Vertical">
              <CosRadioButtonGroup direction="vertical" className="col-span-3">
                {options.map((item) => (
                  <CosRadioButton
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    checked={radio === item.value}
                    onChange={handleChange}
                  />
                ))}
              </CosRadioButtonGroup>
            </RadioButtonGrid>
            <RadioButtonGrid title="Wrap">
              <CosRadioButtonGroup direction="wrap" className="col-span-3">
                {options.map((item) => (
                  <CosRadioButton
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    checked={radio === item.value}
                    onChange={handleChange}
                  />
                ))}
              </CosRadioButtonGroup>
            </RadioButtonGrid>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-8">
            <RadioButtonGrid title="Default">
              <CosRadioButton label={radioButtonLabel} isLoading />
            </RadioButtonGrid>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
