import {
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
} from '@cube-frontend/api'

export const mockAlertTypes: GetPredefinedEventsTypesEnum[] = [
  'system',
  'host',
  'instance',
]

export const mockSeverities: GetPredefinedEventsSeveritiesEnum[] = [
  'Critical',
  'Error',
  'Info',
  'Warning',
]

export const mockCategories = ['KSN', 'CMP', 'ETH', 'CPU']

export const mockEventIds = [
  'KSN00001I',
  'CMP01001I',
  'ETH00001I',
  'CPU00002W',
  'CPU00004I',
  'CPU00006C',
]

export const mockScriptTypes = {
  types: ['Bash'],
  environments: ['Alpine Linux'],
}

export const mockEmails = [
  {
    address: 'example.user.1@example.com',
    note: 'example email recipient 1',
  },
  {
    address: 'example.user.2@example.com',
    note: 'example email recipient 2',
  },
]

export const mockSlacks = [
  {
    name: 'Example slack channel 1',
    url: 'https://example.slack.com/archives/exmpale-token-1',
    description: 'example slack channel 1',
  },
  {
    name: 'Example slack channel 2',
    url: 'https://example.slack.com/archives/exmpale-token-2',
    description: 'example slack channel 2',
  },
]

export const mockPredefinedEvents = [
  {
    type: 'system',
    id: 'KSN00001I',
    severity: 'INFO',
    category: 'KSN',
  },
  {
    type: 'system',
    id: 'CMP01001I',
    severity: 'INFO',
    category: 'CMP',
  },
  {
    type: 'host',
    id: 'ETH00001I',
    severity: 'INFO',
    category: 'ETH',
  },
  {
    type: 'host',
    id: 'CPU00002W',
    severity: 'WARNING',
    category: 'CPU',
  },
  {
    type: 'instance',
    id: 'CPU00004I',
    severity: 'INFO',
    category: 'CPU',
  },
  {
    type: 'instance',
    id: 'CPU00006C',
    severity: 'CRITICAL',
    category: 'CPU',
  },
]

export const mockSpecificTrigger = {
  name: 'Mock data',
  isBuiltIn: true,
  description:
    "Configure how you are going to be notified for system events and host alerts, including levels 'warning', 'error', and 'critical'.",
  attributes: {
    alertTypes: ['system', 'host', 'instance'],
    eventIds: ['KSN00001I', 'ETH00001I', 'CPU00002W'],
    severities: ['Warning', 'Error', 'Critical'],
    categories: ['DEV', 'CPU', 'DSK'],
  },
  response: {
    types: ['script', 'email', 'slack'],
    script: {
      filePath: '/tmp/example.sh',
      content:
        'IyEvYmluL2Jhc2gKCmN1cmwgaHR0cDovL2V4YW1wbGUuY29tICR7IHN0YXR1cyA9ICdzdWNjZXNzJzsgfQ==',
    },
    slacks: [
      {
        name: 'example-slack-channel-0',
        url: 'https://hooks.slack.com/services/<hookHash>/<hookHash>/<hookHash>',
        description: 'example slack channel 1',
        enabled: false,
      },
      {
        name: 'example-slack-channel-1',
        url: 'https://hooks.slack.com/services/<hookHash>/<hookHash>/<hookHash>',
        description: 'example slack channel 2',
        enabled: false,
      },
    ],
    emails: [
      {
        address: 'example.user@example.com',
        note: 'example email recipient',
        enabled: false,
      },
    ],
  },
  enabled: false,
}
