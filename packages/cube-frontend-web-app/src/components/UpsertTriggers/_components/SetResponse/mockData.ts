import {
  EmailRecipientResponse,
  SlackChannelGetResponse,
} from '@cube-frontend/api'

export const mockEmailRecipients: EmailRecipientResponse[] = [
  {
    address: 'example.user.1@example.com',
    note: 'example email recipient 1',
    status: {
      current: 'ok',
      isUpdating: false,
    },
  },
  {
    address: 'example.user.2@example.com',
    note: 'example email recipient 2',
    status: {
      current: 'ok',
      isUpdating: false,
    },
  },
]

export const mockSlackChannels: SlackChannelGetResponse[] = [
  {
    name: '#example-alert-channel-1',
    url: 'https://hooks.slack.com/services/T9LMBBBBB',
    description: 'example alert channel 1',
    status: {
      current: 'ok',
      isUpdating: false,
    },
  },
  {
    name: '#example-alert-channel-2',
    url: 'https://hooks.slack.com/services/T9LMCCCCC',
    description: 'example alert channel 2',
    status: {
      current: 'ok',
      isUpdating: false,
    },
  },
]
