import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosLogConsole } from '../../../components/CosLogConsole/CosLogConsole'
import { ConsoleGrid } from './ConsoleGrid'

const meta = {
  title: 'Molecules/Log Console',
} satisfies Meta<typeof CosLogConsole>

export default meta

const logContent = `> Initializing bath sequence...
> Checking water pressure... OK
> Heating water to 40°C... DONE
> Playing ambient music... ✓
> All systems go.

Status: SUCCESS  
Exit Code: 0`

const getRandomLink = (): string => {
  return `#${Math.random()}`
}

export const Gallery: StoryObj<typeof CosLogConsole> = {
  render: () => {
    return (
      <StoryLayout title="Log Console">
        <StoryLayout.Section title="Log Console">
          <ConsoleGrid title="Master">
            <CosLogConsole title={{ label: 'Title', href: getRandomLink() }}>
              {logContent}
            </CosLogConsole>
          </ConsoleGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <ConsoleGrid title="Title without href">
            <CosLogConsole title={{ label: 'Title' }}>
              {logContent}
            </CosLogConsole>
          </ConsoleGrid>
          <ConsoleGrid title="No Title">
            <CosLogConsole>{logContent}</CosLogConsole>
          </ConsoleGrid>
          <ConsoleGrid title="Custom Copy Tooltip">
            <CosLogConsole
              title={{ label: 'Title', href: getRandomLink() }}
              copyTooltip="This is a custom tooltip :)"
            >
              {logContent}
            </CosLogConsole>
          </ConsoleGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
