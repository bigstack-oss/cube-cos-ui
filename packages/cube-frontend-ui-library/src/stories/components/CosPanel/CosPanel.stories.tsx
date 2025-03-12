import type { Meta, StoryObj } from '@storybook/react'
import { DashboardPanelLayout } from './CosDashboardPanel/DashboardPanelLayout'
import { GeneralPanelLayout } from './CosGeneralPanel/GeneralPanelLayout'

const meta = {
  title: 'Organisms/Panel',
} satisfies Meta

export default meta

export const DashboardPanel: StoryObj = {
  render: () => <DashboardPanelLayout />,
}
export const GeneralPanel: StoryObj = {
  render: () => <GeneralPanelLayout />,
}
