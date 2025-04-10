import { CosToastType } from '../../../../components/CosNotification/CosToastNotification/utils'

export const mockToasts: CosToastType[] = [
  {
    id: 'mock-toast-1',
    type: 'neutral',
    title: 'Heads up!',
    message: 'This is a neutral notification with general info.',
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-2',
    type: 'positive',
    title: 'Success!',
    message: 'Your profile was updated successfully.',
    link: {
      text: 'View Profile',
      href: `/#${Math.random()}`,
    },
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-3',
    type: 'warning',
    title: 'Almost there!',
    message: 'You’re reaching your usage limit. Consider upgrading.',
    link: {
      text: 'Upgrade Now',
      href: `/#${Math.random()}`,
    },
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-4',
    type: 'error',
    title: 'Something went wrong',
    message: 'We couldn’t save your changes. Please try again later.',
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-5',
    type: 'neutral',
    isLoading: true,
    message: 'Uploading your files…',
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-6',
    type: 'neutral',
    title: 'Heads up!',
    message: 'This is a neutral notification with general info.',
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-7',
    type: 'positive',
    title: 'Success!',
    message: 'Your profile was updated successfully.',
    link: {
      text: 'View Profile',
      href: `/#${Math.random()}`,
    },
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-8',
    type: 'warning',
    title: 'Almost there!',
    message: 'You’re reaching your usage limit. Consider upgrading.',
    link: {
      text: 'Upgrade Now',
      href: `/#${Math.random()}`,
    },
    time: 'yyyy/mm/dd 00:00',
  },
  {
    id: 'mock-toast-9',
    type: 'error',
    title: 'Something went wrong',
    message: 'We couldn’t save your changes. Please try again later.',
    time: 'yyyy/mm/dd 00:00',
  },
]
