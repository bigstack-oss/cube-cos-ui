import { GetCosBatchActionTable } from '@cube-frontend/ui-library'

export const TemplateTable = GetCosBatchActionTable<MockTemplate>()

export type MockTemplate = {
  id: string
  template: string
  description: string
  disabled: boolean
}

export const mockTemplates: MockTemplate[] = [
  {
    id: 'template-1',
    template: 'Administrative Level Notification',
    description: `Configure how you are going to be notified for system events and host alerts, including levels 'warning', 'error', and 'critical'.`,
    disabled: false,
  },
  {
    id: 'template-2',
    template: 'User Account Alert',
    description: `Receive notifications when user accounts are created, deleted, or have login failures exceeding the threshold.`,
    disabled: false,
  },
  {
    id: 'template-3',
    template: 'System Maintenance Reminder',
    description: `Set up periodic notifications for upcoming system maintenance, including scheduled downtime and required updates.`,
    disabled: true,
  },
]
