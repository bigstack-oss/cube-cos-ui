import type { Meta, StoryObj } from '@storybook/react'
import { ChangeEvent, useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CheckboxGrid } from './CheckboxGrid'
import { CosCheckbox } from '../../../components/CosCheckbox/CosCheckbox'
import { CosCheckboxGrid } from '../../../components/CosCheckbox/CosCheckboxGrid'

const meta = {
  title: 'Molecules/Checkbox',
  component: CosCheckbox,
} satisfies Meta<typeof CosCheckbox>

export default meta

const checkboxText = 'Checkbox item'
const checkboxTextLonger = 'Checkbox item longer text'

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    const [checked, setChecked] = useState<boolean | null>(true)
    const [unchecked, setUnchecked] = useState<boolean | null>(false)
    const [indeterminateChecked, setIndeterminateChecked] = useState<
      boolean | null
    >(null)

    const handleChecked = (event: ChangeEvent<HTMLInputElement>) =>
      setChecked(event.target.checked)

    const handleUnchecked = (event: ChangeEvent<HTMLInputElement>) =>
      setUnchecked(event.target.checked)

    const handleIndeterminateChecked = (event: ChangeEvent<HTMLInputElement>) =>
      setIndeterminateChecked(event.target.checked)

    return (
      <StoryLayout title="Checkbox">
        <StoryLayout.Section title="Checkbox">
          <CheckboxGrid title="Master">
            <CosCheckbox label={checkboxText} />
          </CheckboxGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-8">
            <CheckboxGrid title="">
              <div className="primary-body2">Default</div>
              <div className="primary-body2">Disabled</div>
            </CheckboxGrid>
            <CheckboxGrid title="Unselect">
              <CosCheckbox
                label={checkboxText}
                checked={unchecked}
                onChange={handleUnchecked}
              />
              <CosCheckbox
                label={checkboxText}
                checked={false}
                onChange={handleUnchecked}
                disabled
              />
            </CheckboxGrid>
            <CheckboxGrid title="Select">
              <CosCheckbox
                label={checkboxText}
                checked={checked}
                onChange={handleChecked}
              />
              <CosCheckbox
                label={checkboxText}
                checked={true}
                onChange={handleChecked}
                disabled
              />
            </CheckboxGrid>
            <CheckboxGrid title="Indeterminate">
              <CosCheckbox
                label={checkboxText}
                checked={indeterminateChecked}
                onChange={handleIndeterminateChecked}
              />
              <CosCheckbox
                label={checkboxText}
                checked={null}
                onChange={handleIndeterminateChecked}
                disabled
              />
            </CheckboxGrid>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <div className="flex flex-col gap-y-20">
            <CheckboxGrid title="Vertical">
              <CosCheckboxGrid direction="vertical">
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxText} />
                <CosCheckbox label={checkboxText} />
              </CosCheckboxGrid>
            </CheckboxGrid>
            <CheckboxGrid title="Wrap">
              <CosCheckboxGrid direction="wrap" className="col-span-3">
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxText} />
                <CosCheckbox label={checkboxText} />
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxTextLonger} />
                <CosCheckbox label={checkboxText} />
                <CosCheckbox label={checkboxText} />
              </CosCheckboxGrid>
            </CheckboxGrid>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-8">
            <CheckboxGrid title="Default">
              <CosCheckbox label={checkboxText} isLoading />
            </CheckboxGrid>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
