import {
  GetTriggersResponseDataInnerResponse,
  GetTriggersResponseDataInnerAttributesInner,
} from '@cube-frontend/api'

export const mockAttributes: GetTriggersResponseDataInnerAttributesInner[] = [
  { name: 'severity', type: 'string', value: 'W', enabled: true },
  { name: 'severity', type: 'string', value: 'E', enabled: true },
  { name: 'severity', type: 'string', value: 'C', enabled: true },
  { name: 'category', type: 'string', value: 'DEV', enabled: false },
  { name: 'category', type: 'string', value: 'CPU', enabled: false },
  { name: 'category', type: 'string', value: 'DSK', enabled: false },
  { name: 'category', type: 'string', value: 'MEM', enabled: false },
  { name: 'category', type: 'string', value: 'NET', enabled: false },
  { name: 'category', type: 'string', value: 'SRV', enabled: false },
  { name: 'category', type: 'string', value: 'VRT', enabled: false },
]

export const mockResponse: GetTriggersResponseDataInnerResponse = {
  types: ['email', 'slack'],
  slacks: [
    {
      name: 'amqp-alert-p1',
      url: 'https://hooks.slack.com/services/<hookHash>/<hookHash>/<hookHash>',
      description: 'example slack channel 1',
      enabled: false,
    },
    {
      name: '#test-cos-300-notification',
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
}
