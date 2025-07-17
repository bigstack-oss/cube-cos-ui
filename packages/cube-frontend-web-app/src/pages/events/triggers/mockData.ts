import { GetTriggersResponseDataTriggersInner } from '@cube-frontend/api'

export const mockTriggers: GetTriggersResponseDataTriggersInner[] = [
  {
    name: 'Administrative Level Notification',
    isBuiltIn: false,
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
        },
        {
          name: 'example-slack-channel-1',
          url: 'https://hooks.slack.com/services/<hookHash>/<hookHash>/<hookHash>',
          description: 'example slack channel 2',
        },
      ],
      emails: [
        {
          address: 'example.user@example.com',
          note: 'example email recipient',
        },
      ],
    },
    status: {
      isUpdating: false,
    },
    enabled: false,
  },
  {
    name: 'Instance Level Notification',
    isBuiltIn: true,
    description:
      "Configure how you are going to be notified for instance alerts, including levels 'warning', and 'critical'.",
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
        },
        {
          name: 'example-slack-channel-1',
          url: 'https://hooks.slack.com/services/<hookHash>/<hookHash>/<hookHash>',
          description: 'example slack channel 2',
        },
      ],
      emails: [
        {
          address: 'example.user@example.com',
          note: 'example email recipient',
        },
      ],
    },
    status: {
      isUpdating: false,
    },
    enabled: false,
  },
]
