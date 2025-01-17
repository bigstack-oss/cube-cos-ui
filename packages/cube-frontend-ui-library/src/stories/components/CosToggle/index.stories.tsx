import { CosToggle } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { ToggleRow } from './ToggleRow'
import { ToggleRowHeader } from './ToggleRowHeader'

const meta = {
  title: 'components/Toggle',
} satisfies Meta

export default meta

export const Toggle: StoryObj = {
  render: () => <ToggleGallery />,
}

const ToggleGallery = () => {
  const [isOn, setIsOn] = useState(false)

  const onChange = (isOn: boolean) => {
    setIsOn(isOn)
  }

  return (
    <StoryLayout title="Toggle">
      <StoryLayout.Section title="Gallery">
        <div className="flex flex-col gap-y-8">
          <ToggleRowHeader />
          <ToggleRow title="Default">
            <CosToggle isOn={isOn} onChange={onChange} />
            <CosToggle
              isOn={isOn}
              label={isOn ? 'On' : 'Off'}
              onChange={onChange}
            />
          </ToggleRow>
          <ToggleRow title="Disabled">
            <CosToggle isOn={isOn} disabled={true} onChange={onChange} />
            <CosToggle
              isOn={isOn}
              label={isOn ? 'On' : 'Off'}
              disabled={true}
              onChange={onChange}
            />
          </ToggleRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
